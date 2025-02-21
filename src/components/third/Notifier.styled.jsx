import styled from 'styled-components';

export const NotifyContainer = styled.div`
display: ${props => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    display: grid;
    place-content: center;
    background-color: #8884;
`
export const NotifyContent = styled.div`
    width: 250px;
    height: 350px;
    background-color: #fff;
    border-radius: 20px;
    padding: 60px 12px;
    display: flex;
    justify-content: center;
    z-index: 28;

    @media screen and (min-width: 768px) {

    width: 400px;
    height: 250px;
    padding: 40px 20px;
} 
`