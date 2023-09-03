import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined,
    selectActivity: (id: string) => void,
    cancelSelecActivity: () => void,
    editMode: boolean,
    openForm: (id?: string) => void,
    closeForm: () => void,
    createOrEditActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard(props: Props) {
    return (

        <Grid>
            <Grid.Column width='10'>
                <List>
                    <ActivityList
                        activities={props.activities}
                        selectActivity={props.selectActivity}
                        deleteActivity={props.deleteActivity}
                        submitting={props.submitting}
                    />
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                {props.selectedActivity && !props.editMode &&

                    <ActivityDetails
                        activity={props.selectedActivity}
                        cancelSelecActivity={props.cancelSelecActivity}
                        openForm={props.openForm}
                    />}
                {
                    props.editMode && <ActivityForm
                        closeForm={props.closeForm}
                        selectedActivity={props.selectedActivity}
                        createOrEditActivity={props.createOrEditActivity}
                        submitting={props.submitting}
                    />
                }
            </Grid.Column>
        </Grid>

    )
}