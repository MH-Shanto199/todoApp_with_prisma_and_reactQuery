import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
type TodoType = {
  id: number;
  task: string;
};

const EditTodo = (props: any) => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoType>({
    defaultValues: {
      id: props.item.id,
      task: props.item.task,
    },
  });

  const updateTodo = async (data: TodoType) => {
    const res = await axios.put('/api/todo', data);
    if (res.data.message) {
      toast.error(res.data.message);
    } else {
      toast.success('task Updated Successfully!');
      return res;
    }
  };

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const onSubmit = (data: TodoType) => {
    // console.log(data);
    updateMutation.mutate(data);
  };

  return (
    <>
      <Modal {...props} size="md" centered>
        <Modal.Header closeButton />
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="updateTodo"
                {...register('task', { required: true })}
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="updateTodo"
                onClick={() => props.onHide()}
              >
                Update Todo
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditTodo;
