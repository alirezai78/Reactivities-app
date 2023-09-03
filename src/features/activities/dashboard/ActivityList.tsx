import { Button, Item, ItemContent, ItemDescription, ItemExtra, ItemGroup, ItemHeader, ItemMeta, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { SyntheticEvent, useState } from "react";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList(props: Props) {

    const [target, setTarget] = useState('');

    function handleActvityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {

        setTarget(e.currentTarget.name);
        props.deleteActivity(id);

    }

    return (
        <Segment>
            <Item.Group divided>
                {props.activities.map(activity => (
                    <Item key={activity.id}>
                        <ItemContent>
                            <ItemHeader as='a'>{activity.title}</ItemHeader>
                            <ItemMeta>{activity.date}</ItemMeta>
                            <ItemDescription>
                                <div>{activity.description}</div>
                                <div>{activity.city} , {activity.venue}</div>
                            </ItemDescription>
                            <ItemExtra>
                                <Button
                                    onClick={() => { props.selectActivity(activity.id) }}
                                    floated="right"
                                    content='View'
                                    color="blue" />

                                <Button
                                    name={activity.id}
                                    loading={props.submitting && target === activity.id}
                                    onClick={(e) => { handleActvityDelete(e, activity.id) }}
                                    floated="right"
                                    content='Delete'
                                    color="red" />
                                <Label basic content={activity.category} />
                            </ItemExtra>
                        </ItemContent>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}