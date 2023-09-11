import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";


export default function ActivityDetails() {

    const { activityStore } = useStore();

    // if (activityStore.selectedActivtiy === undefined)
    //     return;

    return (
        <Card>
            <Image src={`/assets/categoryImages/${activityStore.selectedActivtiy?.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activityStore.selectedActivtiy?.title}</Card.Header>
                <Card.Meta>
                    <span>{activityStore.selectedActivtiy?.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activityStore.selectedActivtiy?.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => { activityStore.openForm(activityStore.selectedActivtiy?.id) }} basic color="blue" content='Edit' />
                    <Button onClick={() => { activityStore.cancelSelectedActivity() }} basic color="grey" content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}