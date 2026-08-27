import { FontAwesome5 } from '@expo/vector-icons';
import firebase from 'firebase';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendNotification } from '../../../redux/actions/index';
import { container, text, utils } from '../../styles';
import CachedImage from '../random/CachedImage';
require('firebase/firestore')



function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState(false)

    const isOwnProfile = useMemo(() => 
        props.route.params.uid === firebase.auth().currentUser.uid,
        [props.route.params.uid]
    );

    useEffect(() => {
        const { currentUser, posts } = props;

        if (isOwnProfile) {
            setUser(currentUser)
            setUserPosts(posts)
            setLoading(false)
        }
        else {
            // Fetch other user's data
            const fetchUserData = async () => {
                try {
                    const userSnapshot = await firebase.firestore()
                        .collection("users")
                        .doc(props.route.params.uid)
                        .get();
                    
                    if (userSnapshot.exists) {
                        props.navigation.setOptions({
                            title: userSnapshot.data().username,
                        })

                        setUser({ uid: props.route.params.uid, ...userSnapshot.data() });
                    }

                    const postsSnapshot = await firebase.firestore()
                        .collection("posts")
                        .doc(props.route.params.uid)
                        .collection("userPosts")
                        .orderBy("creation", "desc")
                        .limit(30) // Add pagination limit
                        .get();
                    
                    let posts = postsSnapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                } finally {
                    setLoading(false)
                }
            };

            fetchUserData();
        }


        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following, props.currentUser, props.posts, isOwnProfile])

    const onFollow = useCallback(() => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})

        props.sendNotification(user.notificationToken, "New Follower", `${props.currentUser.name} Started following you`, { type: 'profile', user: firebase.auth().currentUser.uid })
    }, [user, props.currentUser, props.route.params.uid]);

    const onUnfollow = useCallback(() => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    }, [props.route.params.uid]);

    // Memoize keyExtractor for better performance
    const keyExtractor = useCallback((item, index) => {
        return item.id || index.toString();
    }, []);

    // Memoize renderItem for better performance
    const renderItem = useCallback(({ item }) => (
        <TouchableOpacity
            style={[container.containerImage, utils.borderWhite]}
            onPress={() => props.navigation.navigate("Post", { item, user })}>

            {item.type == 0 ?

                <CachedImage
                    cacheKey={item.id}
                    style={container.image}
                    source={{ uri: item.downloadURLStill }}
                />

                :

                <CachedImage
                    cacheKey={item.id}
                    style={container.image}
                    source={{ uri: item.downloadURL }}
                />
            }
        </TouchableOpacity>
    ), [user, props.navigation]);

    if (loading) {
        return (
            <View style={{ height: '100%', justifyContent: 'center', margin: 'auto' }}>
                <ActivityIndicator style={{ alignSelf: 'center', marginBottom: 20 }} size="large" color="#00ff00" />
                <Text style={[text.notAvailable]}>Loading</Text>
            </View>
        )
    }
    if (user === null) {
        return (
            <View style={{ height: '100%', justifyContent: 'center', margin: 'auto' }}>
                <FontAwesome5 style={{ alignSelf: 'center', marginBottom: 20 }} name="dizzy" size={40} color="black" />
                <Text style={[text.notAvailable]}>User Not Found</Text>
            </View>
        )
    }
    return (
        <ScrollView style={[container.container, utils.backgroundWhite]}>

            <View style={[container.profileInfo]}>

                <View style={[utils.noPadding, container.row]}>

                    {user.image == 'default' ?
                        (
                            <FontAwesome5
                                style={[utils.profileImageBig, utils.marginBottomSmall]}
                                name="user-circle" size={80} color="black" />
                        )
                        :
                        (
                            <Image
                                style={[utils.profileImageBig, utils.marginBottomSmall]}
                                source={{
                                    uri: user.image
                                }}
                            />
                        )
                    }

                    <View style={[container.container, container.horizontal, utils.justifyCenter, utils.padding10Sides]}>

                        <View style={[utils.justifyCenter, text.center, container.containerImage]}>
                            <Text style={[text.bold, text.large, text.center]}>{userPosts.length}</Text>
                            <Text style={[text.center]}>Posts</Text>
                        </View>
                        <View style={[utils.justifyCenter, text.center, container.containerImage]}>
                            <Text style={[text.bold, text.large, text.center]}>{user.followersCount}</Text>
                            <Text style={[text.center]}>Followers</Text>
                        </View>
                        <View style={[utils.justifyCenter, text.center, container.containerImage]}>
                            <Text style={[text.bold, text.large, text.center]}>{user.followingCount}</Text>
                            <Text style={[text.center]}>Following</Text>
                        </View>
                    </View>

                </View>


                <View>
                    <Text style={text.bold}>{user.name}</Text>
                    <Text style={[text.profileDescription, utils.marginBottom]}>{user.description}</Text>

                    {!isOwnProfile ? (
                        <View style={[container.horizontal]}>
                            {following ? (
                                <TouchableOpacity
                                    style={[utils.buttonOutlined, container.container, utils.margin15Right]}
                                    title="Following"
                                    onPress={onUnfollow}>
                                    <Text style={[text.bold, text.center, text.green]}>Following</Text>
                                </TouchableOpacity>
                            )
                                :
                                (
                                    <TouchableOpacity
                                        style={[utils.buttonOutlined, container.container, utils.margin15Right]}
                                        title="Follow"
                                        onPress={onFollow}>
                                        <Text style={[text.bold, text.center, { color: '#2196F3' }]}>Follow</Text>
                                    </TouchableOpacity>

                                )}

                            <TouchableOpacity
                                style={[utils.buttonOutlined, container.container]}
                                title="Follow"
                                onPress={() => props.navigation.navigate('Chat', { user })}>
                                <Text style={[text.bold, text.center]}>Message</Text>
                            </TouchableOpacity>
                        </View>
                    ) :
                        <TouchableOpacity
                            style={utils.buttonOutlined}
                            onPress={() => props.navigation.navigate('Edit')}>
                            <Text style={[text.bold, text.center]}>Edit Profile</Text>
                        </TouchableOpacity>}
                </View>
            </View>

            <View style={[utils.borderTopGray]}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={9}
                    windowSize={5}
                    initialNumToRender={9}
                />
            </View>
        </ScrollView >

    )
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following

})

const mapDispatchProps = (dispatch) => bindActionCreators({ sendNotification }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Profile);

