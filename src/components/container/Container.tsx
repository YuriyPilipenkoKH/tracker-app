import { MainContainer } from "./Container.styled"
import React, { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode;
}
export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <MainContainer className="container">{children}</MainContainer>;
};