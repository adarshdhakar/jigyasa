import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AccountDataUpload = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [hasUploadError, setHasUploadError] = useState(false);
  const [errorCSV, setErrorCSV] = useState('');

  const handleUploadClick = () => document.getElementById('fileInput').click();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || file.type !== 'text/csv') {
      alert(t('upload.invalid_file'));
      return;
    }

    setFileName(file.name);
    setIsModalOpen(true);
    setIsUploading(true);
    setUploadProgress(0);
    setHasUploadError(false);
    setErrorCSV('');

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);

        if (Math.random() < 0.3) {
          setHasUploadError(true);
          setErrorCSV('Sample Error CSV Data\nRow1,Error1\nRow2,Error2');
        }
      }
    }, 200);

    event.target.value = '';
  };

  const handleDownloadErrorFile = () => {
    const blob = new Blob([errorCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'upload_errors.csv';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">{t('upload.download_template')}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {t('upload.use_template')}
          </p>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition">
            {t('upload.download_button')}
          </button>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileChange({ target: { files: e.dataTransfer.files } });
          }}
          className="flex flex-col items-center justify-center h-60 bg-white dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-violet-500 transition"
          onClick={handleUploadClick}
        >
          <img src="/spreadsheet.png" alt="spreadsheet" className="w-20 mb-4 opacity-70" />
          <p className="font-medium">{t('upload.drag_or_click')}</p>
          <p className="text-xs text-gray-500 mt-1">{t('upload.max_size')}</p>
        </div>

        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-md text-center shadow-xl">
            <h3 className="text-lg font-semibold mb-4">
              {isUploading
                ? t('upload.uploading')
                : hasUploadError
                ? t('upload.error_complete')
                : t('upload.success')}
            </h3>

            <div className="w-24 h-24 mx-auto mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="45" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke={hasUploadError ? '#f87171' : '#10b981'}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="282.6"
                  strokeDashoffset={282.6 - (uploadProgress / 100) * 282.6}
                  transform="rotate(-90 50 50)"
                  className="transition-all"
                />
              </svg>
            </div>

            <p className="mb-4 text-sm">{fileName}</p>

            {!isUploading && (
              <div className="space-y-3">
                {hasUploadError && (
                  <button
                    onClick={handleDownloadErrorFile}
                    className="text-violet-600 hover:underline text-sm"
                  >
                    {t('upload.download_error_file')}
                  </button>
                )}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setUploadProgress(0);
                    }}
                    className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition"
                  >
                    {t('upload.done')}
                  </button>
                  <button
                    onClick={() => navigate('/accounts')}
                    className="px-4 py-2 border border-violet-600 text-violet-600 rounded-md hover:bg-violet-50 dark:hover:bg-gray-700 transition"
                  >
                    {t('upload.see_uploaded')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDataUpload;
