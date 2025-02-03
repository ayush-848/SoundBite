import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface AudioUploaderProps {
  onFileUpload: (file: File) => void;
}

export const AudioUploader: React.FC<AudioUploaderProps> = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const audioFile = acceptedFiles[0];
      if (audioFile) onFileUpload(audioFile);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'audio/*': ['.mp3', '.wav'] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 transition-colors"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">Drop audio file here</p>
      ) : (
        <p className="text-gray-500">Drag audio file here, or click to select</p>
      )}
    </div>
  );
};
