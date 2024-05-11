import { StateCreator, create } from "zustand";
import type { Task, TaskStatus } from "../../interfaces";
import { devtools } from "zustand/middleware";

interface TaskState{

    tasks: Record<string, Task>, //{[ key:string]: Task},

    getTaskByStatus: (status: TaskStatus) => Task[];

    draggingTaskId?: string;
    setDraggingInTaskId: (taskId: string) => void;
    removeDraggingTaskId: () => void;

    changeTaskStatus: (taskId: string, status: TaskStatus) => void;

    onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
    draggingTaskId: undefined,
    
    tasks: {
        'ABC-1': {id: 'ABC-1', title: 'Task 1', status: 'open'},
        'ABC-2': {id: 'ABC-2', title: 'Task 2', status: 'in-progress'},
        'ABC-3': {id: 'ABC-3', title: 'Task 3', status: 'open'},
        'ABC-4': {id: 'ABC-4', title: 'Task 4', status: 'open'},
    },

    getTaskByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values( tasks ).filter( tasks => tasks.status === status );
    },

    setDraggingInTaskId: (taskId: string) =>{
        set({ draggingTaskId: taskId });
    },

    removeDraggingTaskId: () =>{
        set({ draggingTaskId: undefined })
    },

    changeTaskStatus: (taskId: string, status: TaskStatus)=>{
        const task = get().tasks[taskId];
        task.status = status;

        set((state) =>({
            tasks: {
                ...state.tasks,
                [taskId]: task,
            }
        }))
    },

    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if(!taskId) return;

        get().changeTaskStatus(taskId, status);
        get().removeDraggingTaskId();
    }
})

export const useTaskStore = create<TaskState>()(
    devtools(
        storeApi
    )
)