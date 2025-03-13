import {useForm} from 'react-hook-form'

function TasksFromPage(){

    const {register, handleSubmit } = useForm ()

    const onSubmit = handleSubmit((data) => {
        console.log(data)
    })

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Title"
                {...register("title" ) }
                autoFocus/>
                <textarea rows="3" placeholder="Description">
                    {...register("description")}
                </textarea>
                <button>
                    Save
                </button>
            </form>
        </div>
    )
}

export default TasksFromPage;