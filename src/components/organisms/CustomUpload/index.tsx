import Image from "next/image";
import React, {ChangeEvent, FC, useRef, useState} from "react";

interface CustomUploadProps{
  form: any;
  name: string;
}

export default function CustomUpload({form, name}: CustomUploadProps){
  const [previewImg, setPreviewImg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      form.setValue(name, e.target.files[0]);
    }
  }

  const hendleUploadFile = () =>{
    inputRef.current?.click();
  }

  return(
    <div className="inline-flex items-center gap-8">
      <div>
        {previewImg !== "" && (
          <Image
            width={120}
            height={120}
            src={previewImg}
            alt={previewImg}
          />
        )}
      </div>
      <div className="py-6 px-10 border-2 cursor-pointer border-gray-500 border-dashed w-max rounded-sm"
        onClick={hendleUploadFile}
      >
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary mx-auto mb-2">
          <path d="M14.2639 15.9375L12.5958 14.2834C11.7909 13.4851 11.3884 13.086 10.9266 12.9401C10.5204 12.8118 10.0838 12.8165 9.68048 12.9536C9.22188 13.1095 8.82814 13.5172 8.04068 14.3326L4.04409 18.2801M14.2639 15.9375L14.6053 15.599C15.4112 14.7998 15.8141 14.4002 16.2765 14.2543C16.6831 14.126 17.12 14.1311 17.5236 14.2687C17.9824 14.4251 18.3761 14.8339 19.1634 15.6514L20 16.4934M14.2639 15.9375L18.275 19.9565M18.275 19.9565C17.9176 20 17.4543 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4.12796 18.7313 4.07512 18.5321 4.04409 18.2801M18.275 19.9565C18.5293 19.9256 18.7301 19.8727 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V16.4934M4.04409 18.2801C4 17.9221 4 17.4575 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.07989 4 7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.0799 20 7.2V16.4934M17 8.99989C17 10.1045 16.1046 10.9999 15 10.9999C13.8954 10.9999 13 10.1045 13 8.99989C13 7.89532 13.8954 6.99989 15 6.99989C16.1046 6.99989 17 7.89532 17 8.99989Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div className="text-center">
          <span className="text-gray-800 font-medium">
            Click to replace
          </span>{" "}
          <span className="text-gray-500">or drag and drop</span>
        </div>
        <div className="text-gray-600 text-sm">
          PNG, JPG, JPEG (max. 400 x 400px)
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
    </div>
  );
}