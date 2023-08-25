import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';

const ListItem = (props) => {
    return (
        <TouchableOpacity
            onPress={() => {
                console.log('touched!', props.singleMedia.title);
            }}
        >
            <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: props.singleMedia.thumbnails.w160 }}
            />
            <Text>{props.singleMedia.title}</Text>
            <Text>{props.singleMedia.description}</Text>
        </TouchableOpacity>
    );
};
ListItem.prototypes = {
    singleMedia: PropTypes.object,
};
export default ListItem;