"use client";

import LoadingComponent from "@/app/loading";
import { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { BASE_API_URL } from "@/constant/BASE_URL";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import Image from "next/image";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { ProductType } from "@/types/products";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

import EditProductForm from "../forms/EditProductForm";
import { accessToken } from "@/types/token";

const paginationComponentOptions = {
  rowsPerPageText: "Row Per Page",
  rangeSeparatorText: "of",
  selectAllRowsItem: true,
  selectAllRowsItemText: "All",
};

export default function ProductTable() {
  const [getData, setData] = useState([]);
  const [data, setDataDelete] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productDetail, setProductDetail] = useState({} as ProductType);
  const [productEdit, setProductEdit] = useState({} as ProductType);
  const [getDeleteData, setButtonDelete] = useState(false);

  const {
    isOpen: isOpenDetailModal,
    onOpen: onOpenDetailModal,
    onClose: onCloseDetailModal,
  } = useDisclosure();
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();

  const handleDetail = (value: ProductType) => {
    setProductDetail(value);
    setIsDetailModalOpen(true);
  };

  // Function to handle edit modal
  const handleEdit = (value: ProductType) => {
    setProductEdit(value);
    setIsEditModalOpen(true);
  };
  const handleDelete = (product: ProductType) => {
    const id = product.id;
    fetch(`${BASE_API_URL}products/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${accessToken}`,
      },
    });
    setDataDelete(data.filter((product) => product.id !== id));
  };

  const route = useRouter();

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
            <Dropdown>
              <DropdownTrigger>
                <button>
                  <IoEllipsisHorizontal />
                </button>
              </DropdownTrigger>

              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  className="w-max font-bold text-green-400"
                  key="detail"
                  onClick={() => handleDetail(row)}
                >
                  View Detail
                </DropdownItem>

                {row.seller === "Sokcheat Srorng" ? (
                  <>
                    <DropdownItem
                      key="edit"
                      onClick={() => handleEdit(row)}
                      className="w-max font-bold text-orange-700"
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
                  </>
                ) : (
                  <></>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    fetch(`${BASE_API_URL}products/?page=1&page_size=1000`)
      .then((res) => res.json())
      .then((data) => {
        const result = data.results;
        setData(result);
        const isSeller = result.some(
          (pro: { seller: string }) => pro.seller === "Sokcheat Srorng"
        );
        setButtonDelete(isSeller);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch(`${BASE_API_URL}products/?page=1 && page_size=1000`)
      .then((res) => res.json())
      .then((data) => {
        const result = data.results;
        setData(result);
        const isSeller = result.some(
          (pro: { seller: string }) => pro.seller === "Sokcheat Srorng"
        );
      });

    setIsLoading(false);
  }, []);

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
        <Modal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Product View
                </ModalHeader>
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
                  <img
                    src={productDetail.image}
                    width={100}
                    height={100}
                    alt="Products"
                  />
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Product View
                </ModalHeader>
                <ModalBody>
                  <EditProductForm product={productEdit} />
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
  );
}
