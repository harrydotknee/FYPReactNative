import { bindActionCreators } from "redux";
import * as workoutsActions from "../actions/workoutsActions";
import Home from "../screens/home";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        workouts: state.workouts,
    };
}

const actions = {
    ...workoutsActions,
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);