"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import * as Yup from "yup"
import Image from "next/image";
import axios  from 'axios';
import { BASE_API_URL } from "@/constant/BASE_URL";

const FILE_SIZE = 1024 * 1024 * 5; 
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  image: Yup.mixed()
    .test("fileSize", "File too large", (value: any) => {
      if (!value) {
        return true;
      }
      return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value: any) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .required("Required"),
});

const fieldStyle = "border border-gray-300 rounded-md";

const CreateProductForm = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MjA1ODA1LCJpYXQiOjE3MTIwNDU3NzIsImp0aSI6ImViMDIzOGQ2NjIxYTQ3MWY4NGVkMTE1NTc1ZmRlMmQ3IiwidXNlcl9pZCI6MzV9.fS3bigIdku92aMlx0_eIzbW_4cIlz8u9lTo8JIDxUos"
  );
  myHeaders.append(
    "Cookie",
    "csrftoken=oj4kVPKicYgWw6ppqnUlkxbsIjARq6gYbmJKhxl3GEoArkenGSgwfUb4T9UGl8VJ; sessionid=e2k7ty0e7g6wbreo2q0wq5d6tj92t2cc"
  );

  const handleSubmitToServer = async (values: any) => {
    // axios is used to make HTTP requests to the server
    try {
      const response = await axios.post(
        `${BASE_API_URL}file/product/`,
        values.image
      );
      return response.data.image;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProduct = async (values: any, imageData: any) => {
    try {
      const imageUrl = await handleSubmitToServer(imageData);
      console.log("data: ", values);
      const postData = await fetch(`${BASE_API_URL}products/`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          ...values,
          image: imageUrl,
        }),
      });
      console.log("post data: ", postData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Formik
        onSubmit={(values: any, { setSubmitting, resetForm }) => {
          console.log(values);
          const formData = new FormData();
          formData.append("image", values.image);
          //   handleSubmitToServer({ image: formData });
          handleCreateProduct(values, { image: formData });
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
        initialValues={{
          category: {
            name: "",
            icon: "",
          },
          name: "",
          desc: "",
          image: undefined,
          price: 0,
          quantity: 0
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex m-[30px] flex-col gap-4">
            {/* name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Product Name: </label>
              <Field
                placeholder="Mazda"
                className={fieldStyle}
                name="name"
                type="text"
              />
            
            </div>
            {/* description */}
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Description: </label>
              <Field
                placeholder="Modern car high speed..."
                className={fieldStyle}
                name="desc"
                type="text"
              />
             
            </div>
            {/* price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price: </label>
              <Field
                placeholder="100"
                className={fieldStyle}
                name="price"
                type="number"
              />
             
            </div>
       
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Quantity: </label>
              <Field
                placeholder="1"
                className={fieldStyle}
                name="quantity"
                type="number"
              />
              </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Category: </label>
              <Field
                placeholder="Electronic Car..."
                className={fieldStyle}
                name="category.name"
                type="text"
              />
             
              <div>
                <Field
                  name="image"
                  className={fieldStyle}
                  type="file"
                  title="Select a file"
                  setFieldValue={setFieldValue} // Set Formik value
                  component={CustomInput} // component prop used to render the custom input
                />
                <ErrorMessage name="image">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-pink-600 text-white rounded-md"
                disabled={isSubmitting}
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductForm;

// custom Input
function CustomInput({ field, form, setFieldValue, ...props }: any) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const name = field.name;
  const onChange: any = (event: any) => {
    console.log("event:", event.currentTarget.files);
    const file = event.currentTarget.files[0];
    setFieldValue(name, file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <input
        type="file"
        onChange={onChange}
        {...props}
        className="border border-gray-300 rounded-md"
      />
      {previewImage && (
        <Image
          className="rounded-md"
          src={previewImage}
          alt="preview Image"
          width={100}
          height={100}
        />
      )}
    </div>
  );
}
