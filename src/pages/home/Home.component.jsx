import { useState, useEffect } from "react";
import { ModifiedTable } from "../../components/table/table.component";
import { CreateEmployee } from "../../components/creation/creation.component";
import AddEmployeeModal from "../../components/modal/modal.component";
import { saveUserData, getUserData, email } from "../../utils/firebase.utils";

export const Homepage = () => {
  const [currentRow, setCurrentRow] = useState(null);

  const [rows, setRows] = useState(() => {
    const storedRows = JSON.parse(localStorage.getItem("rows")) || [];
    return storedRows;
  });

  useEffect(() => {
    // const savedRows = localStorage.getItem("rows");
    // if (savedRows) {
    //   setRows(JSON.parse(savedRows));
    // }
    try {
      console.log("User Data", getUserData(email));
    } catch (e) {
      console.log(e);
      alert("Error to load user data");
    }
  }, []);

  useEffect(() => {
    // localStorage.setItem("rows", JSON.stringify(rows));
    saveUserData(rows);
  }, [rows]);

  const handleAddEmployee = async (newRow) => {
    try {
      const storedRows = (await getUserData(email))[0] || [];
      const updatedRows = [...storedRows, newRow];
      localStorage.setItem("rows", JSON.stringify(updatedRows));
      setRows(updatedRows);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    const newRows = [...rows];
    newRows.splice(id, 1);
    setRows(newRows);
  };

  const handleEditRow = (id, updatedRow) => {
    const updatedRows = rows.map((row) => {
      if (row.id === id) {
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };
  return (
    <div>
      <CreateEmployee />
      <AddEmployeeModal onAddEmployee={handleAddEmployee} />
      <ModifiedTable
        rows={rows}
        setRows={setRows}
        onEdit={handleEditRow}
        onDelete={handleDelete}
        currentRow={currentRow}
        onClose={() => setCurrentRow(null)}
      />
    </div>
  );
};
