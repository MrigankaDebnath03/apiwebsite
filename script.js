// const uploadButton = document.getElementById('upload-button');
// const downloadButton = document.getElementById('download-button');

// uploadButton.addEventListener('change', async (e) => {
//   // Disable download button initially
//   downloadButton.disabled = true;
//   downloadButton.classList.remove('active');

//   const file = e.target.files[0];

//   // Check if file is a ZIP
//   if (!file.name.endsWith('.zip')) {
//     alert('Please select a ZIP file');
//     return;
//   }

//   // Send the file to the server using FormData
//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     const response = await fetch('https://testing-skna.onrender.com/upload-zip/', {
//       method: 'POST',
//       body: formData,
//     });

//     if (response.ok) {
//       // Assuming successful upload enables download button
//       downloadButton.disabled = false;
//       downloadButton.classList.add('active');
//     } else {
//       throw new Error('Error uploading file');
//     }
//   } catch (error) {
//     console.error(error);
//     alert('Error processing file');
//   }
// });

// downloadButton.addEventListener('click', () => {
//     const endpoint = 'https://testing-skna.onrender.com/download-csv/'; // Replace with your FastAPI endpoint URL
  
//     fetch(endpoint, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/octet-stream'
//         }
//     })
//     .then(response => response.blob())
//     .then(blob => {
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'data.csv'; // Replace with the desired file name and extension
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//     })
//     .catch(error => {
//         console.error('Error downloading file:', error);
//     });
//   });
  

document.addEventListener('DOMContentLoaded', function () {
    const uploadButton = document.getElementById('upload-button');
    const downloadButton = document.getElementById('download-button');
  
    uploadButton.addEventListener('change', async function (event) {
      const file = event.target.files[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await fetch('https://testing-skna.onrender.com/upload-zip/', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          console.log('File uploaded successfully!');
          // You can handle success here, such as displaying a success message or triggering another action
        } else {
          console.error('Failed to upload file:', response.statusText);
          // Handle the error condition appropriately, like showing an error message to the user
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle any unexpected errors that might occur during the upload process
      }
    });
  
    downloadButton.addEventListener('click', async function () {
      try {
        const response = await fetch('https://testing-skna.onrender.com/download-csv/');
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
  
          const a = document.createElement('a');
          a.href = url;
          a.download = 'data.csv';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        } else {
          console.error('Failed to download CSV:', response.statusText);
          // Handle the error condition appropriately, like showing an error message to the user
        }
      } catch (error) {
        console.error('Error downloading CSV:', error);
        // Handle any unexpected errors that might occur during the download process
      }
    });
  });
  