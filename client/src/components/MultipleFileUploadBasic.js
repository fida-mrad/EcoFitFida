// import React from 'react';
// import {MultipleFileUpload, MultipleFileUploadMain, MultipleFileUploadStatus, MultipleFileUploadStatusItem, Checkbox, HelperText, HelperTextItem} from '@patternfly/react-core';
// import UploadIcon from '@patternfly/react-icons/dist/esm/icons/upload-icon';

// export const MultipleFileUploadBasic = () => {
//   const [isHorizontal, setIsHorizontal] = React.useState(false);
//   const [fileUploadShouldFail, setFileUploadShouldFail] = React.useState(false);
//   const [currentFiles, setCurrentFiles] = React.useState([]);
//   const [readFileData, setReadFileData] = React.useState([]);
//   const [showStatus, setShowStatus] = React.useState(false);
//   const [statusIcon, setStatusIcon] = React.useState('inProgress');
//   if (!showStatus && currentFiles.length > 0) {
//     setShowStatus(true);
//   }
//   React.useEffect(() => {
//     if (readFileData.length < currentFiles.length) {
//       setStatusIcon('inProgress');
//     } else if (readFileData.every(file => file.loadResult === 'success')) {
//       setStatusIcon('success');
//     } else {
//       setStatusIcon('danger');
//     }
//   }, [readFileData, currentFiles]);
//   const removeFiles = namesOfFilesToRemove => {
//     const newCurrentFiles = currentFiles.filter(currentFile => !namesOfFilesToRemove.some(fileName => fileName === currentFile.name));
//     setCurrentFiles(newCurrentFiles);
//     const newReadFiles = readFileData.filter(readFile => !namesOfFilesToRemove.some(fileName => fileName === readFile.fileName));
//     setReadFileData(newReadFiles);
//   };
//   const updateCurrentFiles = files => {
//     if (fileUploadShouldFail) {
//       const corruptedFiles = files.map(file => ({
//         ...file,
//         lastModified: 'foo'
//       }));
//       setCurrentFiles(prevFiles => [...prevFiles, ...corruptedFiles]);
//     } else {
//       setCurrentFiles(prevFiles => [...prevFiles, ...files]);
//     }
//   };
//   const handleFileDrop = droppedFiles => {
//     const currentFileNames = currentFiles.map(file => file.name);
//     const reUploads = droppedFiles.filter(droppedFile => currentFileNames.includes(droppedFile.name));
//     Promise.resolve().then(() => removeFiles(reUploads.map(file => file.name))).then(() => updateCurrentFiles(droppedFiles));
//   };
//   const handleReadSuccess = (data, file) => {
//     setReadFileData(prevReadFiles => [...prevReadFiles, {
//       data,
//       fileName: file.name,
//       loadResult: 'success'
//     }]);
//   };
//   const handleReadFail = (error, file) => {
//     setReadFileData(prevReadFiles => [...prevReadFiles, {
//       loadError: error,
//       fileName: file.name,
//       loadResult: 'danger'
//     }]);
//   };
//   const createHelperText = file => {
//     const fileResult = readFileData.find(readFile => readFile.fileName === file.name);
//     if (fileResult?.loadError) {
//       return <HelperText isLiveRegion>
//           <HelperTextItem variant={'error'}>{fileResult.loadError.toString()}</HelperTextItem>
//         </HelperText>;
//     }
//   };
//   const successfullyReadFileCount = readFileData.filter(fileData => fileData.loadResult === 'success').length;
//   return <>
//       <MultipleFileUpload onFileDrop={handleFileDrop} dropzoneProps={{
//     accept: 'image/jpeg, application/msword, application/pdf, image/png'
//   }} isHorizontal={isHorizontal}>
//         <MultipleFileUploadMain titleIcon={<UploadIcon />} titleText="Drag and drop files here" titleTextSeparator="or" infoText="Accepted file types: JPEG, Doc, PDF, PNG" />
//         {showStatus && <MultipleFileUploadStatus statusToggleText={`${successfullyReadFileCount} of ${currentFiles.length} files uploaded`} statusToggleIcon={statusIcon}>
//             {currentFiles.map(file => <MultipleFileUploadStatusItem file={file} key={file.name} onClearClick={() => removeFiles([file.name])} onReadSuccess={handleReadSuccess} onReadFail={handleReadFail} progressHelperText={createHelperText(file)} />)}
//           </MultipleFileUploadStatus>}
//       </MultipleFileUpload>
//       <Checkbox id="horizontal-checkbox" label="Show as horizontal" isChecked={isHorizontal} onChange={() => setIsHorizontal(!isHorizontal)} />
//       <Checkbox id="upload-should-fail-checkbox" label="Demonstrate error reporting by forcing uploads to fail" isChecked={fileUploadShouldFail} onChange={() => setFileUploadShouldFail(!fileUploadShouldFail)} />
//     </>;
// };