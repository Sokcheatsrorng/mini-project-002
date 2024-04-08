// Import necessary dependencies
"use client"
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import axios from 'axios';
import { ProductType } from '@/types/products';
import { BASE_API_URL } from '@/constant/BASE_URL';
import { accessToken, cookie } from '@/types/token';

// Define constants for file validation
const FILE_SIZE = 1024 * 1024 * 5; // 5 MB
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

// Define validation schema using Yup
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


// Define CSS class for form fields
const fieldStyle = 'border border-gray-300 rounded-md';

// FormUpdateProduct component
const FormUpdateProduct: React.FC<{ product?: ProductType }> = ({ product }) => {
  // State variables
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  // Function to submit form data to server
  const handleSubmitToServer = async (values: ProductType) => {
    try {
      let url = `${BASE_API_URL}products/`;
      let method = 'PUT';
      if (values.id) {
        url += `${values.id}/`;
        method = 'PUT';
      }
      const response = await axios({
        method: method,
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  `${accessToken}`,
          'Cookie': `${cookie}`,
        },
        data: values,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full ">
      <Formik
        onSubmit={(values: any, { setSubmitting, resetForm }) => {
          const updatedValues = Object.fromEntries(
            Object.entries(values).filter(([key, value]) => value !== undefined && value !== '')
          );
          handleSubmitToServer(updatedValues);
          setSubmitting(false);
          resetForm();
        }}
        validationSchema={validationSchema}
        initialValues={{
          price: selectedProduct?.price || 0,
          quantity: selectedProduct?.quantity || 0,
          image: undefined,
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="flex m-[30px] flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Product Name:</label>
              <Field placeholder="Mazda" className={fieldStyle} name="name" type="text" />
              <ErrorMessage name="name" component="div" className="text-red-600 text-sm italic" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="desc">Description:</label>
              <Field placeholder="This is mazda" className={fieldStyle} name="desc" type="text" />
              <ErrorMessage name="desc" component="div" className="text-red-600 text-sm italic" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price:</label>
              <Field placeholder="100" className={fieldStyle} name="price" type="number" />
              <ErrorMessage name="price" component="div" className="text-red-600 text-sm italic" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="quantity">Quantity:</label>
              <Field placeholder="1" className={fieldStyle} name="quantity" type="number" />
              <ErrorMessage name="quantity" component="div" className="text-red-600 text-sm italic" />
            </div>
            <div>
              <Field name="image" className={fieldStyle} type="file" title="Select a file" setFieldValue={setFieldValue} component={CustomInput} />
              <ErrorMessage name="image" component="div" className="text-red-600 text-sm italic" />
            </div>
            <div className="ml-auto">
              <button type="submit" className="w-max px-4 py-3 bg-[#ff8b00] text-white rounded-lg" disabled={isSubmitting}>Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

// Custom input component for file upload
function CustomInput({ field, form, setFieldValue, ...props }: any) {
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined);
  const name = field.name;

  // Function to handle file change and set preview image
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : undefined;
    setFieldValue(name, file);
    setPreviewImage(file ? URL.createObjectURL(file) : undefined);
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <input type="file" onChange={onChange} {...props} className={fieldStyle} />
      {previewImage && <Image className="rounded-md" src={previewImage} alt="preview Image" width={100} height={100} />}
    </div>
  );
}

export default FormUpdateProduct;
