import { useState, useEffect } from "react";
import { ModifiedTable } from "../../components/table/table.component";
import { CreateEmployee } from "../../components/creation/creation.component";
import AddEmployeeModal from "../../components/modal/modal.component";
import {
  saveUserData,
  getUserData,
  email,
  auth,
} from "../../utils/firebase.utils";

export const Homepage = () => {
  const [currentRow, setCurrentRow] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userData = await getUserData(email);
          setRows(userData);
        } catch (error) {
          console.log(error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      saveUserData(rows);
    }
  }, [rows]);

  const handleAddEmployee = async (newRow) => {
    try {
      const storedRows = (await getUserData(email)) || [];
      const updatedRows = [...storedRows, newRow];
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
