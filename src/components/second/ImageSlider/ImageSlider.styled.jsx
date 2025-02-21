import styled from 'styled-components';

export const SliderWrapper = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
    &>img {
    width: 300px;
    height: 300px;
    }

    &>button.Previous {
        position: absolute;
        top: 50%;
        left: -40px;
        transform: translate(0, -50%);
    }
    &>button.Next {
        position: absolute;
        top: 50%;
        right: -40px;
        transform: translate(0, -50%);
    }
`
export const Dots = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding:12px 8px;
    
    &>.Dot {
        cursor: pointer;
        &:hover  {
            &>svg {
                fill: blue;
            }
        }
    }
`