import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
    activities: Activity[];
    createOrEditActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default observer(function ActivityDashboard(props: Props) {

    const { activityStore } = useStore();

    return (

        <Grid>
            <Grid.Column width='10'>
                <List>
                    <ActivityList
                        activities={props.activities}
                        deleteActivity={props.deleteActivity}
                        submitting={props.submitting}
                    />
                </List>
            </Grid.Column>
            <Grid.Column width='6'>
                {activityStore.selectedActivtiy && !activityStore.editMode &&

                    <ActivityDetails />}
                {
                    activityStore.editMode && <ActivityForm
                        createOrEditActivity={props.createOrEditActivity}
                        submitting={props.submitting}
                    />
                }
            </Grid.Column>
        </Grid>

    )
});