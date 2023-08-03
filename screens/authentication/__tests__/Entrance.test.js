import renderer from 'react-test-renderer';
import Entrance from '../Entrance';

describe('<Entrance />', () => {

    test('renders correctly', ()=>{
        const tree = renderer
        .create(<Entrance/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
    });

})