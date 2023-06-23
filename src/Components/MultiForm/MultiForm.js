import React,{useState} from 'react'
import styled from 'styled-components';
import { MultiStepForm, Step } from 'react-multi-form'
import RegisterPage1 from './RegisterPage1'
import RegisterPage2 from './RegisterPage2'
import Confirmation from './Confirmation'

const Container = styled.div`
  max-width: 500px;
  margin: 40px auto;

  @media(max-width: 590px) {
    width: 300px;
  }
`

const MultiForm = () => {

  const [active, setActive] = React.useState(1);
  //const [isLoggedIn, setLoggedIn] = useState(true);
  const [firstPageData, setFirstPageData] = useState("");

  return (
    <Container>
      <MultiStepForm activeStep={active}>
        <Step label='Account Creation'>
          <RegisterPage1 
            active = {active}
            onSetActive={setActive}
            onDataInput={setFirstPageData}
          />
        </Step>
        <Step label='Interests'>
          <RegisterPage2 
            active = {active}
            onSetActive={setActive}
            firstPageData={firstPageData}
          />
        </Step>
        <Step label='confirmation'>
          <Confirmation 
            active = {active}
            onSetActive={setActive}
          />
        </Step>
      </MultiStepForm>

      
    </Container>
  )
}

export default MultiForm;