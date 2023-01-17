import {DayPilot, DayPilotMonth} from "@daypilot/daypilot-lite-react";
import React from "react";
import "./MonthStyles.css";
import "./icons/style.css";
//https://code.daypilot.org/26289/react-monthly-calendar-tutorial

type Props = {
    
}

function Calendar({}: Props) {
  
  
  const calendarRef = React.createRef();

  function calendar() {
    return calendarRef.current;
  }

  const [state, setState] = React.useState({
    eventHeight: 30,
    headerHeight: 30,
    cellHeaderHeight: 25,
    onBeforeEventRender: (args:any) => {
      args.data.borderColor = "darker";
      if (args.data.backColor) {
        args.data.barColor = DayPilot.ColorUtil.darker(args.data.backColor, -1);
      }
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: (args:any) => {
            const e = args.source;
            calendar.events.remove(e);
          }
        },
        {
          text: "-"
        },
        {
          text: "Blue",
          icon: "icon icon-blue",
          color: "#3d85c6",
          onClick: (args:any) => this.updateColor(args.source, args.item.color)
        },
        {
          text: "Green",
          icon: "icon icon-green",
          color: "#6aa84f",
          onClick: (args:any) => this.updateColor(args.source, args.item.color)
        },
        {
          text: "Yellow",
          icon: "icon icon-yellow",
          color: "#ecb823",
          onClick: (args:any) => this.updateColor(args.source, args.item.color)
        },
        {
          text: "Red",
          icon: "icon icon-red",
          color: "#d5663e",
          onClick: (args:any) => this.updateColor(args.source, args.item.color)
        },
        {
          text: "Auto",
          color: null,
          onClick: (args:any) => this.updateColor(args.source, args.item.color)
        },

      ]
    }),
    onTimeRangeSelected: async (args:any) => {
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");

      this.calendar.clearSelection();
      if (!modal.result) {
        return;
      }
      this.calendar.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      });
    },
  }
  );

   
        return (
          <div>
          <DayPilotMonth
            {...state}
            ref={calendarRef}
          />
        </div>
        )
         
       
}
export default Calendar
