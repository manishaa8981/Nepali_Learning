from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from transformers import WhisperForConditionalGeneration, WhisperProcessor
import torchaudio
import torch
import io

# 1. Create FastAPI app
app = FastAPI()

# 2. Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can replace "*" with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load your model
MODEL_PATH = "./whisper-nepali-finetuned"
model = WhisperForConditionalGeneration.from_pretrained(MODEL_PATH)
processor = WhisperProcessor.from_pretrained("openai/whisper-small")

# 4. Transcription endpoint
@app.post("/transcribe/")
async def transcribe(file: UploadFile = File(...)):
    # Read the uploaded audio file
    audio_bytes = await file.read()
    waveform, sample_rate = torchaudio.load(io.BytesIO(audio_bytes))

    # Resample to 16kHz if needed
    if sample_rate != 16000:
        waveform = torchaudio.transforms.Resample(orig_freq=sample_rate, new_freq=16000)(waveform)

    # Preprocess for Whisper
    inputs = processor(waveform.squeeze(), sampling_rate=16000, return_tensors="pt")

    # Run inference (no training)
    with torch.no_grad():
        predicted_ids = model.generate(inputs["input_features"])

    # Decode the output to text
    transcription = processor.batch_decode(predicted_ids, skip_special_tokens=True)[0]
    return {"transcription": transcription}
