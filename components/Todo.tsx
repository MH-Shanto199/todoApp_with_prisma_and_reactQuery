import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import EditTodo from './EditTodo';

const Todo = (props: any) => {
  const [modalState, setModalState] = useState(false);

  const queryClient = useQueryClient();
  const { item, index } = props;
  const deleteTodo = async (data: AxiosRequestConfig<any> | undefined) => {
    const res = await axios.delete('/api/todo', {
      data,
    });
    return res;
  };

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      toast.success('task deleted Successfully!');
      queryClient.invalidateQueries();
    },
  });
  return (
    <>
      <ul className="list-group mt-3">
        <li className="align-items-center d-flex justify-content-between list-group-item">
          {index + 1} : {item.task}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-warning me-2"
              onClick={() => setModalState(true)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => deleteMutation.mutate(item)}
            >
              <FontAwesomeIcon icon={faTrashArrowUp} />
            </button>
          </div>
        </li>
      </ul>
      <EditTodo show={modalState} onHide={() => setModalState(false)} item={item}/>
    </>
  );
};

export default Todo;
