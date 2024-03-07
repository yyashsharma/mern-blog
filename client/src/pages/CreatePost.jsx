import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [formData, setFormData] = useState({});

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);

  const handleUpdloadImage = async () => {
    try {
      if (!file) {
        toast.error("Please select an image");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          toast.error("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      toast.error("Image upload failed");
      setImageUploadProgress(null);
    }
  };
  console.log(imageUploadProgress);

  return (
    <div className="min-h-screen p-3 max-w-3xl mx-auto">
      <h1 className="text-center text-3xl font-semibold my-7">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a cateogory</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React Js</option>
            <option value="nextjs">Next Js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            outline
            onClick={handleUpdloadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {formData.image && (
          <img
            src={formData.image}
            alt="uplaod"
            className="w-full h-72 object-contain"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something here..."
          required
          className="h-72 mb-12"
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
