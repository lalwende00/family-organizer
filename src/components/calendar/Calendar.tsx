import {DayPilot, DayPilotMonth} from "@daypilot/daypilot-lite-react";
type Props = {
    
}

function Calendar({}: Props) {
  
  

   
        return (
          <div>
          <DayPilotMonth
           ref={"calendarRef"}
          />
        </div>
        )
         
       
}
export default Calendar
