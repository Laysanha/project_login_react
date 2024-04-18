import styled from "styled-components";

interface ValidationMessageProps {
    isValid: boolean;
}

export const ValidationMessage = styled.li<ValidationMessageProps>`
    color: ${props => props.isValid ? "blue" : "orange"};
`;