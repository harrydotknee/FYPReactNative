const {accessToken, client, uid} = route.params;
const [workoutData, setWorkoutData] = useState([]);

useEffect(() => {
  const fetchWorkouts = async () => {
    const getCredentials = await SecureStore.getItemAsync('credentials');
    const credentialsObject = JSON.parse(getCredentials);
    const credentials = {
      'access-token': credentialsObject['access-token'],
      'client': credentialsObject['client'],
      'uid': credentialsObject['uid'],
    };
    fetch(`${API_URL}/workouts?` + new URLSearchParams(credentials), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async res => {
      try {
        const jsonRes = await res.json();
        console.log(res.status);
        if (res.status === 200) {
          console.log(jsonRes);
          let workoutList = [];
          for (let i = 0; i < jsonRes.length; i++) {
            workoutList.push(jsonRes[i]);
          }
          setWorkoutData(workoutList);
        }
      } catch (err) {
        console.log("HEREEE");
        console.log(err);
      }
    });
  };
  const unsubscribe = navigation.addListener('focus', () => {
    fetchWorkouts();
  });
  return unsubscribe;
}, []);