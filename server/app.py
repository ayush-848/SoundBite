from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from moviepy.editor import AudioFileClip, vfx
import io
import tempfile

app = Flask(__name__)
CORS(app, origins=["https://sound-bite-v2.vercel.app"]) 

@app.route('/')
def home():
    return "This is SoundBite API"

@app.route('/process', methods=['POST'])
def process_audio():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']
        speed_factor = float(request.form.get('speed', 1.0))

        # Save uploaded file to a temporary file (required for AudioFileClip)
        with tempfile.NamedTemporaryFile(delete=True, suffix=".mp3") as temp_audio:
            file.save(temp_audio.name)  # Save the uploaded file
            temp_audio.flush()  # Ensure data is written

            # Load audio file from temporary storage
            clip = AudioFileClip(temp_audio.name)

            # Apply speed effect
            processed_clip = clip.fx(vfx.speedx, speed_factor)

            # Save processed audio to memory
            output_buffer = io.BytesIO()
            processed_clip.write_audiofile(output_buffer, codec='mp3')
            output_buffer.seek(0)

            return send_file(output_buffer, as_attachment=True, download_name="processed_audio.mp3", mimetype="audio/mp3")

    except Exception as e:
        return jsonify({'error': f'Processing error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)  # Add this line to start the Flask server
