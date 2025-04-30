"use client";

import React, { useEffect } from "react";
import "../globals.css";
import { useNotificationContext } from "../context/NotificationContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from "@/assets/deleteModal";
import EditModal from "@/assets/editModal";
import InputField from "@/assets/InputField";
import Link from "next/link";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  aimed_carbohydrates: number;
  aimed_fibers: number;
  aimed_proteins: number;
  aimed_calories: number;
};

type UserRowProps = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  aimed_carbohydrates: number;
  aimed_fibers: number;
  aimed_proteins: number;
  aimed_calories: number;
  index: number;
  getUserList: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

const UserRow: React.FC<UserRowProps> = ({ id, first_name, last_name, email, aimed_carbohydrates, aimed_fibers, aimed_proteins, aimed_calories, index, onDelete, onEdit }) => {

  return (

    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg cursor-pointer">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{first_name}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{last_name}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{email}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{aimed_carbohydrates}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{aimed_fibers}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{aimed_proteins}</td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{aimed_calories}</td>
      {/* <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{cart_id}</td> */}
      <td scope="col" className="px-6 py-3 gap-1">
        <button onClick={onEdit} data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" className="mr-5 hover:text-gray-900"><FontAwesomeIcon icon={faPen} /></button>
        <button onClick={onDelete} data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" className="hover:text-gray-900"><FontAwesomeIcon icon={faTrash} /></button>

      </td>
    </tr>
  )
}

const TitleOfPage = ({ title }: { title: string }) => {
  return (
    <div className="flex w-full gap-10 flex-row justify-between">
      <div className="flex flex-grow items-center">
        <h1 className="p-5 text-3xl font-bold">{title}</h1>
      </div>
    </div>
  )
}

export default function Page() {
  const [userList, setUserList] = React.useState<User[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);  // Delete Modal state here
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);  // Edit Modal state here
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null); // Store product to delete
  const { setSuccessMessage, setErrorMessage } = useNotificationContext(); // Get the context methods

  const getUserList = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_USER}/all`);

      console.log('User List loaded successfully :', response.data);
      setUserList(response.data);

    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  const deleteUser = async (userId: number, selectedUser: User) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_USER}/${userId}`
      );
      setSuccessMessage(`The ${selectedUser.first_name} has been deleted.`);
      console.log("User deleted successfully !");
      getUserList(); // Refresh the user list
      setIsDeleteModalOpen(false); // Close the modal
    } catch (error) {
      setSuccessMessage(`Error deleting the user : ${error}`)
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = async (userId: number, updatedUser: User) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_USER}/${userId}`,
        updatedUser,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });

      setSuccessMessage(`The user ${response.data.first_name} has been edited !`);
      getUserList(); // Refresh user list after edit
      setIsEditModalOpen(false); // Close modal after success
    } catch (error) {
      setErrorMessage('Failed to edit the user');
      console.error('Error editing user:', error);
    }
  };

  const handleCancel = () => {
    isDeleteModalOpen && setIsDeleteModalOpen(false); // Close Delete modal
    isEditModalOpen && setIsEditModalOpen(false); // Close Edit modal
  };

  const handleOpenModal = (user: User) => {
    setSelectedUser(user); // Store user to delete
    setIsDeleteModalOpen(true); // Open modal
  };

  const handleOpenEditModal = (user: User) => {
    setSelectedUser(user); // Store user to delete
    setIsEditModalOpen(true); // Open modal
  };

  const title: string = 'Admin Page';

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div>
      <div>
        <div className="min-w-full">
          <TitleOfPage title={title} />
          <div className="flex min-w-full gap-4 flex-col">
            <div className="relative overflow-x-auto min-w-full shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gradient-to-tl from-amber-500 to-yellow-400 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      First Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Last Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Aimed carbohydrates
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Aimed fibers
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Aimed proteins
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Aimed calories
                    </th>
                    {/* <th scope="col" className="px-6 py-4">
                      Cart ID
                    </th> */}
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userList && userList.map((user) => {
                    return (
                      <UserRow onEdit={() => handleOpenEditModal(user)} onDelete={() => handleOpenModal(user)} getUserList={getUserList} id={user.id} first_name={user.first_name} last_name={user.last_name} email={user.email} aimed_carbohydrates={user.aimed_carbohydrates} aimed_fibers={user.aimed_fibers} aimed_proteins={user.aimed_proteins} aimed_calories={user.aimed_calories} key={user.id} index={user.id} />
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <Link href="/userCreation">
                <button type="button" className="text-gray-900 dark:text-white bg-gradient-to-bl from-amber-400 to-orange-700 font-bold rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                                transition duration-100 ease-in-out hover:scale-95">Add a user</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isDeleteModalOpen && selectedUser && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          title="Delete User"
          message={`Are you sure you want to delete the product ${selectedUser.first_name}?`}
          onSubmit={() => deleteUser(selectedUser.id, selectedUser)}
          onCancel={handleCancel}
        />
      )}
      {isEditModalOpen && selectedUser && (
        <EditModal
          isOpen={isEditModalOpen}
          title={`Edit the user ${selectedUser.first_name}`}
          initialValues={selectedUser}
          submitLabel="Modify the user"
          onCancel={handleCancel}
          onSubmit={(updatedUser) => handleEditUser(selectedUser.id, updatedUser)}
        >
          <InputField
            label="first_name"
            value={selectedUser.first_name}
            onChange={(value) => setSelectedUser({ ...selectedUser, first_name: value })}
            type="text"
            customLabel="First Name"
          />
          <InputField
            label="last_name"
            value={selectedUser.last_name}
            onChange={(value) => setSelectedUser({ ...selectedUser, last_name: value })}
            type="text"
            customLabel="Last Name"
          />
          <InputField
            label="email"
            value={selectedUser.email}
            onChange={(value) => setSelectedUser({ ...selectedUser, email: value })}
            type="text"
            customLabel="Email"
            readOnly
          />
          <InputField
            label="aimed_carbohydrates"
            value={selectedUser.aimed_carbohydrates}
            onChange={(value) => setSelectedUser({ ...selectedUser, aimed_carbohydrates: value })}
            type="text"
            customLabel="Aimed Carbohydrates"
          />
          <InputField
            label="aimed_fibers"
            value={selectedUser.aimed_fibers}
            onChange={(value) => setSelectedUser({ ...selectedUser, aimed_fibers: value })}
            type="text"
            customLabel="Aimed Fibers"
          />
          <InputField
            label="aimed_proteins"
            value={selectedUser.aimed_proteins}
            onChange={(value) => setSelectedUser({ ...selectedUser, aimed_proteins: value })}
            type="text"
            customLabel="Aimed Proteins"
          />
          <InputField
            label="aimed_calories"
            value={selectedUser.aimed_calories}
            onChange={(value) => setSelectedUser({ ...selectedUser, aimed_calories: value })}
            type="text"
            customLabel="Aimed Calories"
          />
          {/* <InputField
            label="cart_id"
            value={selectedUser.cart_id}
            onChange={(value) => setSelectedUser({ ...selectedUser, cart_id: value })}
            type="text"
            customLabel="Cart ID"
            readOnly
          /> */}
        </EditModal>
      )}
    </div>
  );
}
