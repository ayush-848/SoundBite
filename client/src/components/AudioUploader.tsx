import { useState } from 'react';
import { FiUploadCloud, FiScissors, FiClock, FiMusic,FiPlus, FiMinus } from 'react-icons/fi';

interface AudioUploaderProps {
  onAudioProcessed: (processedAudioUrl: string) => void;
}

export const AudioUploader: React.FC<AudioUploaderProps> = ({ onAudioProcessed }) => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [action, setAction] = useState<'none' | 'trim' | 'speed'>('none');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [speedFactor, setSpeedFactor] = useState(1.0);
  const [outputFormat, setOutputFormat] = useState<'mp3' | 'wav' | 'flac' | 'aac'>('mp3');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid audio file (MP3, WAV, FLAC, AAC)');
    }
  };

  const handleUpload = async () => {
    if (!audioFile) {
      alert('Please select an audio file to upload.');
      return;
    }
  
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('action', action);
    formData.append('start', startTime.toString());
    formData.append('end', endTime.toString());
    formData.append('speed', speedFactor.toString());
    formData.append('format', outputFormat);
  
    console.log('FormData:', Array.from(formData.entries())); // Debugging
  
    try {
      const response = await fetch('http://127.0.0.1:5000/process', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to process audio: ${errorMessage}`);
      }
  
      const data = await response.blob();
      const audioUrl = URL.createObjectURL(data);
      onAudioProcessed(audioUrl);
      alert('Audio processed successfully!');
    } catch (error) {
      console.error('Error processing audio:', error);
      alert('Failed to process the audio file');
    } finally {
      setIsProcessing(false);
    }
  };
  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl border border-teal-500/30">
      {/* Upload Section */}
      <div className="group">
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          className="hidden"
          id="audio-upload"
        />
        <label
          htmlFor="audio-upload"
          className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-teal-500/40 rounded-xl cursor-pointer bg-gray-800/50 hover:border-teal-400 transition-colors"
        >
          <FiUploadCloud className="w-12 h-12 text-teal-400 mb-4" />
          <span className="text-gray-300 font-medium text-center">
            {audioFile ? (
              <>
                <span className="text-teal-300 block truncate">{audioFile.name}</span>
                <p className="text-sm text-gray-400 mt-2">Click to change file</p>
              </>
            ) : (
              'Drag & drop audio file or click to browse'
            )}
          </span>
        </label>
      </div>
  
      {/* Audio Preview */}
      {previewUrl && (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
          <p className="text-sm font-medium text-teal-400 mb-2 flex items-center">
            <FiMusic className="mr-2" /> Preview
          </p>
          <audio controls src={previewUrl} className="w-full" />
        </div>
      )}
  
      {/* Processing Controls */}
      <div className="mt-6 space-y-6">
        {/* Action Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-teal-400 flex items-center">
            <FiScissors className="mr-2" /> Processing Action
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['none', 'trim', 'speed'].map((option) => (
              <button
                key={option}
                onClick={() => setAction(option as any)}
                className={`p-3 text-sm font-medium rounded-lg ${
                  action === option
                    ? 'bg-teal-500 text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
  
        {/* Trim Controls */}
        {action === 'trim' && (
  <div className="space-y-4 bg-gray-800 p-4 rounded-lg border border-teal-500/30">
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Number Input Component */}
      <div className="flex-1">
        <label className="text-sm font-medium text-teal-300 mb-2 block">Start Time (seconds)</label>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setStartTime(prev => Math.max(0, prev - 1))}
            className="p-2 bg-gray-700/50 hover:bg-teal-500/20 rounded-lg border border-teal-500/30 transition-colors"
          >
            <FiMinus className="w-4 h-4 text-teal-400" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2 bg-gray-700/50 border border-teal-500/30 rounded-lg text-center text-gray-300 font-mono"
            />
          </div>
          <button 
            onClick={() => setStartTime(prev => prev + 1)}
            className="p-2 bg-gray-700/50 hover:bg-teal-500/20 rounded-lg border border-teal-500/30 transition-colors"
          >
            <FiPlus className="w-4 h-4 text-teal-400" />
          </button>
        </div>
      </div>

      {/* End Time Input */}
      <div className="flex-1">
        <label className="text-sm font-medium text-teal-300 mb-2 block">End Time (seconds)</label>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setEndTime(prev => Math.max(0, prev - 1))}
            className="p-2 bg-gray-700/50 hover:bg-teal-500/20 rounded-lg border border-teal-500/30 transition-colors"
          >
            <FiMinus className="w-4 h-4 text-teal-400" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(Math.max(0, Number(e.target.value)))}
              className="w-full px-4 py-2 bg-gray-700/50 border border-teal-500/30 rounded-lg text-center text-gray-300 font-mono"
            />
          </div>
          <button 
            onClick={() => setEndTime(prev => prev + 1)}
            className="p-2 bg-gray-700/50 hover:bg-teal-500/20 rounded-lg border border-teal-500/30 transition-colors"
          >
            <FiPlus className="w-4 h-4 text-teal-400" />
          </button>
        </div>
      </div>
    </div>

    {/* Duration Display */}
    <div className="text-right">
      <span className="text-sm text-teal-400/80 font-mono">
        Duration: {Math.max(0, endTime - startTime)}s
      </span>
    </div>
  </div>
)}
  
        {/* Speed Controls */}
        {action === 'speed' && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <label className="text-sm font-medium text-gray-300 block mb-3">
              Speed Factor (1.0 = normal speed)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={speedFactor}
                onChange={(e) => setSpeedFactor(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-teal-400 font-bold w-20 text-center">
                {speedFactor}x
              </span>
            </div>
          </div>
        )}
  
        {/* Output Format */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-teal-400 flex items-center">
            <FiClock className="mr-2" /> Output Format
          </label>
          <div className="grid grid-cols-4 gap-2">
            {['mp3', 'wav', 'flac', 'aac'].map((format) => (
              <button
                key={format}
                onClick={() => setOutputFormat(format as any)}
                className={`p-3 text-sm font-medium rounded-lg ${
                  outputFormat === format
                    ? 'bg-teal-500 text-gray-900'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
  
        {/* Process Button */}
        <button
          onClick={handleUpload}
          disabled={isProcessing}
          className="w-full py-3 px-6 bg-teal-500 hover:bg-teal-600 text-gray-900 font-bold rounded-lg transition-colors flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </>
          ) : (
            'Process Audio'
          )}
        </button>
      </div>
    </div>
  );
};
