import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";

interface Props {
    submitting: boolean;
}

export default function ActivityForm(props: Props) {

    const { activityStore } = useStore();

    const initialState = activityStore.selectedActivtiy ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    function handleFormSubmit() {
        activity.id?activityStore.updateActivity(activity):activityStore.createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleFormSubmit} autoComplete="off">
                <Form.Input placeholder="Title" name='title' value={activity.title} onChange={handleInputChange} />
                <Form.TextArea placeholder="Description" name='description' value={activity.description} onChange={handleInputChange} />
                <Form.Input placeholder="Category" name='category' value={activity.category} onChange={handleInputChange} />
                <Form.Input type="date" placeholder="Date" name='date' value={activity.date} onChange={handleInputChange} />
                <Form.Input placeholder="City" name='city' value={activity.city} onChange={handleInputChange} />
                <Form.Input placeholder="Venue" name='venue' value={activity.venue} onChange={handleInputChange} />
                <Button loading={props.submitting} floated="right" positive type="submit" content="Submit" />
                <Button onClick={()=>{activityStore.closeForm()}} floated="right" positive type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}