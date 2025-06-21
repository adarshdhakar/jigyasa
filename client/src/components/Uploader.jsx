import { useState, useEffect } from 'react';
// import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../../../config';
const getCompanyName = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  // When using localhost with a subdomain (e.g., subdomain.localhost)
  if (hostname.includes("localhost") && hostname !== "localhost") {
    return parts[0];
  } 
  // When using a production domain like company.dashboard.triumphiq.com
  else if (parts.length >= 4 && parts[1] === 'dashboard' && parts[2] === 'triumphiq') {
    return parts[0];
  }
  return '';
};

const AccountDataUpload = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [lastUploadedFile, setLastUploadedFile] = useState(null);
  const [hasUploadError, setHasUploadError] = useState(false);
  const [errorCSV, setErrorCSV] = useState('');

  const fetchLastUploadedFile = async () => {
    const companyName = getCompanyName();
    if (!companyName) return;
    const token = localStorage.getItem(`${companyName}$authToken`);
    try {
      const response = await axios.get(
        `${BASE_URL}/uploaded-csv?csvType=ACCOUNT_UPLOAD`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      const files = response.data;
      if (files && files.length > 0) {
        // Assume the first element is the most recent file.
        setLastUploadedFile(files[0]);
      } else {
        setLastUploadedFile(null);
      }
    } catch (error) {
      console.error("Error fetching uploaded CSV:", error);
      setLastUploadedFile(null);
    }
  };

  useEffect(() => {
    fetchLastUploadedFile();
  }, [isModalOpen]);

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setFileName(file.name);
      setIsModalOpen(true);
      setIsUploading(true);
      setHasUploadError(false);
      setErrorCSV('');

      const companyName = getCompanyName();
      if (!companyName) return;

      const token = localStorage.getItem(`${companyName}$authToken`);
      const formData = new FormData();
      formData.append('file', file);

      try {
        // POST the file to the API
        const response = await fetch(`${BASE_URL}/accounts/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Read the response as text (CSV raw data)
        const responseText = await response.text();

        // Check for any failure in the CSV.
        // You could be more robust by parsing the CSV, but here we simply check if "FAILURE" exists.
        if (responseText.includes("FAILURE")) {
          setHasUploadError(true);
          setErrorCSV(responseText);
        }

        // Simulate upload progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          setUploadProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
          }
        }, 200);
      }
      catch (error) {
        console.error('There was a problem with the upload operation:', error);
        setIsUploading(false);
      }
    } else {
      alert('Please upload a valid CSV file.');
    }

    event.target.value = '';
  }

  const handleCloseUploadModal = () => {
    setIsModalOpen(false);
    setUploadProgress(0);
    setFileName('');
  }

  const handleDownloadClick = async () => {
    const companyName = getCompanyName();
    if (!companyName) return;

    const token = localStorage.getItem(`${companyName}$authToken`); 
  
    try {
      const response = await axios.get(`${BASE_URL}/accounts/csv`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'text/csv',
        },
        responseType: 'blob',
      });
  
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'accounts_data.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('There was a problem with the file download:', error);
    }
  };

  // This function downloads the error CSV if any failures were found during upload.
  const handleDownloadErrorFile = () => {
    if (!errorCSV) return;
    const blob = new Blob([errorCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'accounts_error_data.csv'; 
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadLastUploadedFile = () => {
    if (!lastUploadedFile) return;
    const blob = new Blob([lastUploadedFile.csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    // Use the fileName from API if provided, otherwise a default name.
    a.download = lastUploadedFile.fileName || 'last_uploaded_file.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
      <>
        <div className="flex flex-col align-top justify-start mt-4">
            <div className="self-stretch px-8 py-7 border-t border-zinc-100 inline-flex flex-col justify-start items-center gap-6">
            <div className="self-stretch flex flex-col justify-start items-start gap-7">
                <div className="self-stretch pl-2.5 pr-4 py-5 rounded-2xl shadow-[0px_4px_15px_0px_rgba(0,0,0,0.30)] outline outline-1 outline-offset-[-1px] outline-zinc-100 inline-flex justify-start items-center gap-7">
                  <div className="flex-1 flex justify-start items-center gap-2">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 19.2812V6.15625M15.75 19.2812C14.831 19.2812 13.1139 16.6637 12.4688 16M15.75 19.2812C16.669 19.2812 18.3862 16.6637 19.0312 16" stroke="#6938EF" strokeWidth="1.96875" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M26.25 21.9062C26.25 25.1639 25.5701 25.8438 22.3125 25.8438H9.1875C5.92987 25.8438 5.25 25.1639 5.25 21.9062" stroke="#6938EF" strokeWidth="1.96875" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div className="flex-1 inline-flex flex-col justify-start items-start gap-[5px]">
                      <div className="self-stretch justify-center text-stone-950 text-lg font-medium font-['Inter']">Download CSV file</div>
                      <div className="self-stretch justify-center text-zinc-400 text-xs font-normal font-['Inter']">You can download the attached example and use them as a starting point for your own file. </div>
                      </div>
                  </div>
                  <button onClick={handleDownloadClick}>
                      <div className="px-2.5 py-3 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-[3px]">
                      <div className="justify-start text-violet-600 text-sm font-medium font-['Inter']">Download</div>
                      </div>
                  </button>
                </div>
            </div>
            <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                handleFileChange({ target: { files: e.dataTransfer.files } });
            }}
            
            className="self-stretch h-80 p-10 bg-white rounded-2xl outline-1 outline-[#d6d6d6] outline-dashed outline-offset-[-0.50px] inline-flex flex-col justify-center items-center gap-5">
                <div className="w-32 h-25 relative overflow-hidden">
                <img src="/spreadsheet.png" alt="spreadsheet" />
                </div>
                <div className="justify-center text-stone-950 text-base font-normal font-['Inter']">Import from Spreadsheet</div>
                <div className="flex flex-col justify-start items-center gap-1.5">
                <button onClick={handleUploadClick}>
                    <div className="h-10 px-5 py-3 bg-violet-600 rounded-md inline-flex justify-center items-center gap-2.5 overflow-hidden">
                        <div className="justify-start text-white text-sm font-medium font-['Inter']">Upload CSV File</div>
                    </div>
                </button>
                <div className="text-right justify-center text-neutral-700 text-xs font-normal font-['Inter']">Maximum size : 25MB</div>
                </div>
            </div>

            {/* Conditionally render the Last Uploaded File UI if lastUploadedFile is available */}
            {lastUploadedFile && (
                <div className="self-stretch inline-flex flex-col justify-start items-start gap-2.5">
                <div className="self-stretch inline-flex justify-start items-center gap-36">
                    <div className="text-right justify-center text-stone-950 text-base font-normal font-['Inter']">
                    Last Uploaded File
                    </div>
                </div>
                <div className="self-stretch pl-2.5 pr-4 py-5 rounded-2xl shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)] outline outline-1 outline-offset-[-1px] outline-zinc-100 inline-flex justify-start items-center gap-7">
                    <div className="flex-1 flex justify-start items-center gap-[12px]">
                    <div className="flex-1 inline-flex flex-col justify-start items-start gap-[5px]">
                        <div className="self-stretch justify-center text-stone-950 text-lg font-medium font-['Inter']">
                        {lastUploadedFile.fileName}
                        </div>
                        <div className="self-stretch justify-center text-zinc-400 text-xs font-normal font-['Inter']">
                        Uploaded on {new Date(lastUploadedFile.uploadedAt || Date.now()).toLocaleDateString('en-GB').replace(/\//g, '.')}
                        </div>
                    </div>
                    </div>
                    <button onClick={handleDownloadLastUploadedFile} className="px-3 py-2 bg-violet-600 rounded-md">
                    <div className="text-white text-sm font-medium font-['Inter']">Download</div>
                    </button>
                </div>
                </div>
            )}
            </div>
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
            <div className="w-[550px] p-10 bg-neutral-50 rounded-2xl outline-1 outline-dashed outline-offset-[-0.50px] outline-zinc-300 inline-flex flex-col justify-center items-center gap-5">
                <div className="w-[500px] px-6 py-2.5 flex flex-col justify-start items-start overflow-hidden">
                <div className="self-stretch text-center justify-center text-black text-lg font-bold font-['Inter'] leading-normal">
                    {isUploading ? 'Upload in progress...' : 'Upload Complete'}
                </div>
                </div>
                <div className="self-stretch pt-3.5 pb-4 bg-white rounded-xl outline-dashed outline-1 outline-offset-[-1px] outline-zinc-300 flex flex-col justify-start items-center gap-[5px] overflow-hidden">
                <div className="self-stretch flex flex-col justify-start items-center gap-2.5">
                    <div data-state="start" className="w-24 h-24 relative">
                    <svg className="w-24 h-24 left-0 top-0 absolute" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" stroke="#D1D5DB" strokeWidth="7" fill="none" />
                        <circle cx="50" cy="50" r="45" stroke="#10B981" strokeWidth="7" fill="none" strokeDasharray="282.6" strokeDashoffset={282.6 - (uploadProgress / 100) * 282.6} transform="rotate(-90 50 50)"/>
                    </svg>
                    </div>
                    <div className="self-stretch text-center justify-center text-stone-950 text-sm font-normal font-['Inter']">
                    {isUploading ? `Uploading ${fileName}` : `Uploaded file ${fileName}`}
                    </div>
                </div>
                {!isUploading && (
                    <div className="flex flex-col">
                    {hasUploadError && (
                        <button 
                        onClick={ handleDownloadErrorFile } 
                        className="self-stretch text-center justify-center text-violet-600 text-sm mb-[20px] font-normal font-['Inter'] underline"
                        >
                        Download error file
                        </button>
                    )}
                    <div className="self-stretch inline-flex justify-center items-start gap-2.5">
                        <button onClick={ handleCloseUploadModal } className="h-10 px-5 py-3 bg-violet-600 rounded-md flex justify-center items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-white text-xs font-medium font-['Inter']">Done</div>
                        </button>
                        <button onClick={() => { navigate("/accounts") }} className="h-10 px-5 py-3 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-violet-600 flex justify-center items-center gap-2.5 overflow-hidden">
                            <div className="justify-start text-violet-600 text-xs font-medium font-['Inter']">See Uploaded Data</div>
                        </button>
                    </div>
                    </div>
                )}
                </div>
            </div>
            </div>
        )}
        <input type="file" id="fileInput" style={{display: 'none'}} onChange={handleFileChange} />
      </>
  );
};

export default AccountDataUpload;
