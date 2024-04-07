
"use client"

import LoadingComponent from "@/app/loading";
import { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component"
import {BASE_API_URL} from '@/constant/BASE_URL'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import Image from "next/image";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { ProductType } from "@/types/products";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";

import EditProductForm from "../forms/EditProductForm";


const paginationComponentOptions = {
  rowsPerPageText: "Row Per Page",
  rangeSeparatorText: "of",
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

export default function ProductTable() {
  const [getData, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productDetail, setProductDetail] = useState({} as ProductType);
  const [productEdit, setProductEdit] = useState({} as ProductType);

  const { isOpen: isOpenDetailModal, onOpen: onOpenDetailModal, onClose: onCloseDetailModal } = useDisclosure();
  const { isOpen: isOpenEditModal, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();


  const handleDetail = (value: ProductType) => {
    setProductDetail(value);
    setIsDetailModalOpen(true);
  };

  // Function to handle edit modal
  const handleEdit = (value: ProductType) => {
    setProductEdit(value);
    setIsEditModalOpen(true);
  };
  const handleDelete = async (productId: ProductType) => {
        try {
          const response = await fetch(`${BASE_API_URL}${productId.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0MjA1ODA1LCJpYXQiOjE3MTIwNDU3NzIsImp0aSI6ImViMDIzOGQ2NjIxYTQ3MWY4NGVkMTE1NTc1ZmRlMmQ3IiwidXNlcl9pZCI6MzV9.fS3bigIdku92aMlx0_eIzbW_4cIlz8u9lTo8JIDxUos', // 
              'Cookie': 'csrftoken=oj4kVPKicYgWw6ppqnUlkxbsIjARq6gYbmJKhxl3GEoArkenGSgwfUb4T9UGl8VJ; sessionid=e2k7ty0e7g6wbreo2q0wq5d6tj92t2cc',
            },
          });
          const data = await response.json();
          console.log('Deleted product:', data);
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };
  const route = useRouter()

  const columns: TableColumn<ProductType>[] = [
    {
      name: "ID",
      selector: (row): any => (
        <div className=" font-bold text-blue-600">{row.id}</div>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Price",
      selector: (row) => row.price,
    },
    {
      name: "Image",
      selector: (row): any => (
        <Image src={`${row.image}`} width={80} height={80} alt="product" />
      ),
    },
    {
      name: "Action",
      cell: (row) => {
        return (
          <div className="rounded-[50%] bg-gray-50 w-max p-2">
            <Dropdown >
              <DropdownTrigger>
                <button>
                  <IoEllipsisHorizontal />
                </button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">

              <DropdownItem
                className="w-max font-bold text-green-400  "
                key="detail"
                onClick={() => handleDetail(row)}
              >
                View Detail
              </DropdownItem>

                <DropdownItem key="edit" onClick={() => handleEdit(row)}
                className="w-max font-bold text-orange-700 "
                >
                  Edit
                  </DropdownItem>

                <DropdownItem
                  key="delete"
                  className="w-max hover:rounded-xl font-bold text-red-400 hover:bg-red-400 hover:font-bold hover:text-white"
                  color="danger"
                  onClick={() => handleDelete(row)}
                >
                  Delete
                </DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetch(`${BASE_API_URL}products/?page=1`).then(res => res.json())
      .then(data => setData(data.results))
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!search) {
      setFilter(getData);
      return;
    }
    const result = getData.filter((item: ProductType) => {
      return item.name?.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(result);
  }, [getData, search]);


  return (
    <>
      <div className="flex flex-col w-[340px] pt-2 m-auto text-center sm:mx-7 sm:w-[700px]  mg:w-[1000px] lg:w-[1200px]  lg:justify-between lg:flex h-max bg-[whitesmoke]">
      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Product View</ModalHeader>
              <ModalBody>
                <p> 
                  Name:
                  {productDetail.name}
                </p>
                <p>
                  Price:
                  {productDetail.price}
                </p>
                <p>
                  Description: 
                  {productDetail.desc}
                </p>
                <p>
                  Quantity:
                  {productDetail.quantity}
                </p>
                <img src={productDetail.image} width={100} height={100} alt="Products" />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Product View</ModalHeader>
              <ModalBody>
                <EditProductForm product={productEdit}/>
              </ModalBody>
            </>
          )}
        </ModalContent>
        
      </Modal>
        <DataTable
        selectableRows
          progressPending={isLoading}
          columns={columns}
          fixedHeader={true}
          fixedHeaderScrollHeight="500px"
          pagination
          paginationComponentOptions={paginationComponentOptions}
          subHeader
          subHeaderComponent={ 
            <input
            className="border-[1px] px-4 py-2 w-full rounded-md border-blue-400"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          }
          progressComponent={<LoadingComponent />}
          data={filter}
        />
      </div>
    </>
  )
}