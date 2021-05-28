import dayjs from "dayjs";
import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchCurrentDateTasks } from "../../redux/tasks";
import ScheduleColumn from "./ScheduleColumn";

/**
 * conteneur des colonnes de tâches
 */
const ScheduleContainer: FunctionComponent = () => {
    const { currentTasks, currentDate } = useSelector((state: RootState) => {
        return state.tasks;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentDateTasks(currentDate));
    }, [currentDate, dispatch]);

    /**
     * renvoi le petit (05/11) a coté du jour
     */
    const getDayInfo = (dayIndex: number): string => {
        return `${dayjs(currentDate).day(dayIndex).format("DD")}/${dayjs(
            currentDate
        )
            .day(dayIndex)
            .format("MM")}`;
    };

    return (
        <div id="schedule-container">
            <ScheduleColumn
                dayIdentifier={`Lundi ${getDayInfo(1)}`}
                tasks={currentTasks.filter(
                    (task) => new Date(task.date).getDay() === 1
                )}
            />
            <ScheduleColumn
                dayIdentifier={`Mardi ${getDayInfo(2)}`}
                tasks={currentTasks.filter((task) => {
                    return new Date(task.date).getDay() === 2;
                })}
            />
            <ScheduleColumn
                dayIdentifier={`Mercredi ${getDayInfo(3)}`}
                tasks={currentTasks.filter(
                    (task) => new Date(task.date).getDay() === 3
                )}
            />
            <ScheduleColumn
                dayIdentifier={`Jeudi ${getDayInfo(4)}`}
                tasks={currentTasks.filter(
                    (task) => new Date(task.date).getDay() === 4
                )}
            />
            <ScheduleColumn
                dayIdentifier={`Vendredi ${getDayInfo(5)}`}
                tasks={currentTasks.filter(
                    (task) => new Date(task.date).getDay() === 5
                )}
            />
            <ScheduleColumn
                dayIdentifier={`Autre`}
                tasks={currentTasks.filter(
                    (task) =>
                        new Date(task.date).getDay() === 6 ||
                        new Date(task.date).getDay() === 0
                )}
            />
        </div>
    );
};

export default ScheduleContainer;