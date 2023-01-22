import React, { useCallback, useEffect, useMemo, useState } from "react";
import AlternateDays from "../../interfaces/alternateDays";
import Modal from "./Modals/Modal";
import UseModal from "./Modals/UseModal";
type Props = {};

function Calendar({}: Props) {
  const [date, setDate] = useState<Date>(new Date());
  const { isOpen, toggle } = UseModal();
  
  const listOfDays: string[] = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];

  const [mockData,setMockData] = useState<AlternateDays>(
    {
      motherDays: [],
      fatherDays: [],
      motherDaysOff: [],
      fatherDaysOff: []
    }
  );

  const [year, setYear] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<number>(date.getMonth());
  const [nameMonth, setNameMonth] = useState<string>(
    date.toLocaleDateString("fr", { month: "long" })
  );
  const [day, setDay] = useState<number>(date.getDate());
  const [numberOfDaysInCurrentMonth, setNumberOfDaysInCurrentMonth] = useState<
    number[]
  >([]);
  const [listOfPreivousMonthDay, setListOfPreivousMonthDay] = useState<
    number[]
  >([]);

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };

  const getNameOfDay = (year: number, month: number, day: number): string => {
    return new Date(
      `${month.toString()} ${day.toString()} ${year.toString()}`
    ).toLocaleDateString("fr", {
      weekday: "long",
    });
  };

  const initNumberOfdaysInCurrentMonth = (): void => {
    const numberDays = getDaysInMonth(year, month + 1);
    const stockDays: number[] = [];
    for (let i = 0; i < numberDays; i++) {
      stockDays.push(i + 1);
    }
    setNumberOfDaysInCurrentMonth(stockDays);
  };

  const calculatesNumberOfDay = (): void => {
    const numberDay = getDaysInMonth(
      month === 0 ? year - 1 : year,
      month === 0 ? 12 : month
    );
    const indexDay = listOfDays.indexOf(getNameOfDay(year, month + 1, 1));
    const days: number[] = [];
    for (let i = numberDay; i > numberDay - indexDay; i--) {
      days.push(i);
    }
    setListOfPreivousMonthDay(days);
  };

  const initDate = (): void => {
    setYear(date.getFullYear());
    setMonth(date.getMonth());
    setNameMonth(date.toLocaleDateString("fr", { month: "long" }));
    setDay(date.getDate());
  };

  //intitialization of all date when we change date
  useEffect(() => {
    initDate();
  }, [date]);


  useEffect(() => {
    calculatesNumberOfDay();
    initNumberOfdaysInCurrentMonth();
  }, [month, year]);

  const handleClickNextMonth = (): void => {
    const newMonth = month + 1 === 12 ? 1 : month + 2;
    const newYear = month + 1 === 12 ? year + 1 : year;
    setDate(new Date(`${newMonth} 1 ${newYear}`));
  };

  const handleClickPreviousMonth = (): void => {
    const newMonth = month - 1 === -1 ? 12 : month;
    const newYear = month - 1 === -1 ? year - 1 : year;
    setDate(new Date(`${newMonth} 1 ${newYear}`));
  };



  function addMotherDay(dayOfCurrentMonth: number): void {
    const date = new Date(year,month,dayOfCurrentMonth);
    const mother = mockData.motherDays.push(date);
    setMockData(motherDays => ({
      ...motherDays,
      mother
    }) );

    console.log("mock data",mockData)
  }

  return (
    <div className="mb-2 ">
      <div className="p-4 h-[420px] bg-white shadow-lg rounded-2xl dark:bg-gray-700">
        <div className="flex flex-wrap overflow-hidden">
          <div className="w-full rounded shadow-sm">
          <button data-modal-target="staticModal" data-modal-toggle="staticModal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          Toggle modal
          </button>
          <Modal></Modal>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl font-bold text-left text-black dark:text-white">
                <span className="mr-2 cursor-pointer">
                  {nameMonth.charAt(0).toUpperCase() + nameMonth.slice(1)}
                </span>
                <span className="cursor-pointer">{year}</span>
              </div>
              <div className="flex space-x-4">
                <button
                  className="p-2 text-white bg-blue-500 rounded-full"
                  onClick={handleClickPreviousMonth}
                >
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
                    ></path>
                  </svg>
                </button>
                <button
                  className="p-2 text-white bg-blue-500 rounded-full"
                  onClick={handleClickNextMonth}
                >
                  <svg
                    width="15"
                    height="15"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="-mx-2">
              <div className="w-ful grid grid-cols-7 p-4 dark:text-white">
                {/* days name */}
                <span className="px-2 py-3 font-bold  text-center">L</span>
                <span className="px-2 py-3 font-bold  text-center">M</span>
                <span className="px-2 py-3 font-bold  text-center">M</span>
                <span className="px-2 py-3 font-bold  text-center">J</span>
                <span className="px-2 py-3 font-bold  text-center">V</span>
                <span className="px-2 py-3 font-bold  text-center">S</span>
                <span className="px-2 py-3 font-bold  text-center">D</span>

                {/* day of last month */}
                {listOfPreivousMonthDay.length > 0 &&
                  listOfPreivousMonthDay
                    .sort((a: number, b: number) => a - b)
                    .map((dayOfPreviousMonth: number) => (
                      <span
                        className="px-2 py-3 text-center text-gray-300  dark:text-gray-500"
                        key={dayOfPreviousMonth}
                      >
                        {dayOfPreviousMonth}
                      </span>
                    ))}
                {numberOfDaysInCurrentMonth.length &&
                  numberOfDaysInCurrentMonth.map(
                    (dayOfCurrentMonth: number) => {
                      if (dayOfCurrentMonth === day) {
                        return (
                          <span className="px-2 py-3 text-center text-white cursor-pointer ">
                            <span onClick={toggle} className="p-2 bg-blue-500 rounded-full">
                              {dayOfCurrentMonth}
                            </span>
                            <Modal isOpen={isOpen} toggle={toggle}>
                          
                        </Modal>
                          </span>
                        );
                      } else {
                        return (
                          <div>
                          <span id="clickSpan" onClick={toggle} data-modal-target="defaultModal" data-modal-toggle="defaultModal" className="block text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 px-2 py-3 text-center cursor-pointer hover:text-blue-500">
                            {dayOfCurrentMonth}
                          </span>
                          <Modal isOpen={isOpen} toggle={toggle}>
                          <div data-modal-target="staticModal" data-modal-toggle="staticModal" id="defaultModal" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                          <div className="relative w-full h-full max-w-2xl md:h-auto">

                              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                                  <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                          Terms of Service
                                      </h3>
                                      <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                                          <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                          <span className="sr-only">Close modal</span>
                                      </button>
                                  </div>

                                  <div className="p-6 space-y-6">
                                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                          With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                                      </p>
                                      <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                          The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                                      </p>
                                  </div>

                                  <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                      <button data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
                                      <button data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                                  </div>
                              </div>
                          </div>
                          </div>
                        </Modal>
                        </div>
                        );
                      }
                    }
                  )}
                {/* <span className="px-2 py-3 text-center cursor-pointer  hover:text-blue-500">
                  1
                </span>
                <span className="relative px-1 py-3 text-center cursor-pointer hover:text-blue-500">
                  5
                  <span className="absolute bottom-0 w-2 h-2 transform -translate-x-1/2 bg-blue-500 rounded-full left-1/2"></span>
                </span>
                <span className="px-2 py-3 text-center text-white cursor-pointer ">
                  <span className="p-2 bg-blue-500 rounded-full">13</span>
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Calendar);

