import React, { useEffect, useState } from "react";
import Navbar2 from "./NavBar2";
import { BsDot } from "react-icons/bs";
import { CiFilter } from "react-icons/ci";
import { LiaCalendar } from "react-icons/lia";
import { RiAdminLine } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DiMagento } from "react-icons/di";
// import DatePicker from "react-multi-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { create_punch, facility_create, facility_create_state, get_caregiver, get_single_punch, punch_action, update_punch } from "../redux/slice/caregiver";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { DatePicker, Stack } from 'rsuite';

import Cookies from "js-cookie";
import moment from "moment/moment";
import "react-date-range/dist/styles.css"; // Import the styles
import "react-date-range/dist/theme/default.css"; // Import the theme
import Dropdown from "react-bootstrap/Dropdown";
import { DateRange } from "react-date-range";
import { get_agency } from "../redux/slice/agency";
import dotImg from "../asset/Dots.png";
// import filterImg from "../asset/Vector (3).png";
import POS from "../asset/Vector.png";
import AGEN from "../asset/Agency.png";
import calImg from "../asset/Calendar.png";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InputLabel from "@mui/material/InputLabel";

import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { ProductService } from "./service/ProductService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { get_single_user } from "../redux/slice/login";


const Dashboard = () => {
  const { loading, data, single_punch_loading, create_loading, punch, facility_create_state, create_error, single_punch } = useSelector((state) => state.employee);
  const { user,user_facility } = useSelector((state) => state.login);
  const { agency } = useSelector((state) => state.agency);
  const [modalShow, setModalShow] = React.useState("");
  const [edit_modalShow, setedit_ModalShow] = React.useState("");
  const [formdisplay, setformdisplay] = useState("string");
  const [punch_fields, setpunch_fields] = useState({
    emp_id: "",
    position: "",
    type: "",
    agency: ""
  });

  const [create_facility, setcreate_facility] = useState({
    name: "",
    timezone: "",
    city: "",
    state: "",
    address: "",
    phone: "",
    locationId:""
  });


  const navigate = useNavigate()
  const [company_manger, setcompany_manger] = useState(false)

  const [err_emp_id, seterr_emp_id] = useState("")
  const [err_type, seterr_type] = useState("")
  const [err_position, seterr_position] = useState("")
  const [err_agency, seterr_agency] = useState("")
  const [err_date, seterr_date] = useState("")
  const [err_facility, seterr_facility] = useState("")
  const [err_punchString, seterr_punchString] = useState("")

  const [punch_date, setpunch_date] = useState("")
  const [punch_string, setpunch_string] = useState("");
  const [punch_facility, setpunch_facility] = useState("");

  const [blurcls, setblurcls] = useState("");



  const [value, setValue] = useState("1");

  let token = Cookies.get("token");
  const dispatch = useDispatch();

  const [position, setposition] = useState("");
  const [positionname, setpositionname] = useState("Position");
  const [search, setsearch] = useState("");
  const [agency_id, setagency_id] = useState("");
  const [agencyname, setagencyname] = useState("Agency");
  const [facilityName, setfacilityName] = useState();
  const [facility, setfacility] = useState("");
  const [anchorEl, setAnchorEl] = useState();
  const [facilitymodal, setfacilitymodal] = useState("");
  const open = Boolean(anchorEl);
  const [startdate, setstartdate] = useState("");
  const [enddate, setenddate] = useState("");


  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlechange_punch_fields = (e) => {
    setpunch_fields({ ...punch_fields, [e.target.name]: e.target.value });
  };


  const handlechange_create_facility = (e) => {
    setcreate_facility({ ...create_facility, [e.target.name]: e.target.value });
  };


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (facility_create_state) {
      if (facility_create_state.status === true) {
        setfacilitymodal("")
        setcreate_facility({
          name: "",
          timezone: "",
          city: "",
          state: "",
          address: "",
          phone: "",
        })
        dispatch(get_single_user({token}))
        dispatch(punch_action.facility_state_blank())
        toast.success("facility create successfully", {
          position: "top-right",
        });
      }
    } if (create_error) {
      setcreate_facility({
        name: "",
        timezone: "",
        city: "",
        state: "",
        address: "",
        phone: "",
      })
      dispatch(punch_action.facility_state_blank())
      toast.error(create_error.msg, {
        position: "top-right",
      });
    }
  }, [facility_create_state, create_error])



  const handleSelect = (ranges) => {
    console.log(ranges);

    const stdate = new Date(ranges.selection.startDate);
    const endate = new Date(ranges.selection.endDate);

    setSelectionRange(ranges.selection);
    setstartdate(moment(stdate).format("YYYY-MM-DD"));
    setenddate(moment(endate).format("YYYY-MM-DD"));
  };

  const handleClose = (e) => {
    console.log(e.target.value);
    if(e.target.value){
      setposition(e.target.value);
    }
    let val = e.target.value == 1 ? "LPN" :e.target.value == 2 ? "RN":"Position";

    setpositionname(val);
    setAnchorEl(null);
  };

  const createpunch_withfields = (e) => {
    e.preventDefault()

    if (!punch_fields.agency) {
      console.log("agency")
      seterr_agency(true)
    }

    if (!punch_fields.position) {
      console.log("agency")
      seterr_position(true)
    }

    if (!punch_fields.type) {

      seterr_type(true)
    }

    if (!punch_fields.emp_id) {
      seterr_emp_id(true)
    }

    if (!punch_date) {
      seterr_date(true)
    }

    if (!punch_facility) {
      seterr_facility(true)
    }
    else if (!punch_facility || !punch_date || !punch_fields.emp_id || !punch_fields.type || !punch_fields.position || !punch_fields.agency) {
      return false
    }
    else {


      let punchs = `${punch_fields.agency}-${punch_fields.emp_id}-${punch_fields.position}-${punch_fields.type}-${punch_date}`
      console.log(punch_fields, `${punch_fields.agency}-${punch_fields.emp_id}-${punch_fields.position}-${punch_fields.type}-${punch_date}`)

      dispatch(create_punch({ token, punch: punchs, facility_id: punch_facility }))

    }

  }


  const updatepunch = (e) => {

    e.preventDefault()

    if (!punch_fields.agency) {
      console.log("agency")
      seterr_agency(true)
    }

    if (!punch_fields.position) {
      console.log("agency")
      seterr_position(true)
    }

    if (!punch_fields.type) {

      seterr_type(true)
    }

    if (!punch_fields.emp_id) {
      seterr_emp_id(true)
    }

    if (!punch_date) {
      seterr_date(true)
    }


    else if (!punch_date || !punch_fields.emp_id || !punch_fields.type || !punch_fields.position || !punch_fields.agency) {
      return false
    }
    else {

      const { id, agency, position, type, emp_id } = punch_fields
      const initialDate = moment(punch_date);
      const convertedFormat = initialDate.format("YYYYMMDDhhmmA").toLowerCase();
      let utcTime = convertedFormat

      dispatch(update_punch({ token, id, agency, type, position, caregiver: emp_id, utcTime }))

    }
  }


  const close_editmodal = () => {
    setedit_ModalShow(false)
    setpunch_fields({
      agency: "",
      position: "",
      type: "",
      emp_id: ""
    })
    setpunch_facility("")
    setpunch_date("")
  }

  const add_facility = (e) => {
    e.preventDefault()
    console.log(create_facility)
    dispatch(facility_create({ token, company: user?.company, facility: create_facility }))
  }




  useEffect(() => {
    if (single_punch?.status == true) {
      let data = single_punch?.data
      console.log(data.agency.Id)
      setpunch_fields({
        id: data._id,
        agency: data.agency.Id,
        position: data.position,
        type: data.type,
        emp_id: data.caregiver.agencyEmployeeId
      })
      setpunch_facility(data.facility_id._id)
      setpunch_date(new Date(data.utcTime))
      console.log(punch_fields)
    }
  }, [single_punch])


  useEffect(() => {
    if (punch) {
      if (punch.status == true) {
        setModalShow(false)
        setpunch_string("")
        setpunch_facility("")
        dispatch(
          get_caregiver({
            token,
            position,
            startdate,
            enddate,
            agency_id,
            facility,
            search,
          })
        );
        close_editmodal()
        setpunch_date("")
      }
    }
    if (create_error) {
      console.log(create_error)
      toast.error(create_error.msg, {
        position: "top-right",
      });
    }
  }, [punch, create_error])




  useEffect(() => {
    
    if (user) {

      // if (user?.facility?.length) { 
      //   setfacility(user?.facility[0]?._id);
      //   setfacilityName(user?.facility[0]?.name);
      // }

    

      if (!user?.is_subscriptable_agency_tracking && !user?.is_subscriptable_text) {
        navigate("/landing-page")
      }
      // if (user?.roles?.length) {
        
        let role = user?.roles?.map((it) => it?.name)
        if (user?.facility.length === 0 && (!role.includes("company_manger") || !role.includes("admin"))) {
          
            setfacilitymodal("no_facility");
            setblurcls("blur");
          
          
        }

        if (!user?.company && (!role.includes("company_manger") || !role.includes("admin")) ) {
          setfacilitymodal("no_facility");
          setblurcls("blur");
        }


        if (role.includes("company_manger")) {
          console.log("company_manager")
          setcompany_manger(true)
        }
      // }
      

    }

    
    if (user_facility?.length) { 
      setfacility(user_facility[0]?._id);
      setfacilityName(user_facility?.name);
    }
  }, [user,user_facility]);

  useEffect(() => {
    // ProductService.getProductsMini().then((data) => setProducts(data));
    if (token && facility) {
      dispatch(
        get_caregiver({
          token,
          position,
          startdate,
          enddate,
          agency_id,
          facility,
          search,
        })
      );
    }
  }, [position, startdate, enddate, token, agency_id, facility, search]);

  useEffect(() => {
    // ProductService.getProductsMini().then((data) => setProducts(data));
    if (token) {
      dispatch(get_agency({ token }));
    }
  }, []);
  return (
    <>
      <div className={blurcls}>
        <Navbar2 />
        <div className="choose-auth">
          <div className="container chose-option-auth">
            <div style={{ display: "flex" }}>

              <p className="admin-name-choose-sel">Punchs</p>
              {/* <p className="admin-name-choose">Admin</p> */}
            </div>

            <p>
              {/* <BsDot color="#979797" size={25} />
            <BsDot color="#979797" size={25} /> */}
              {/* <img src={dotImg} /> */}
            </p>
            <div>
              {company_manger ?
                <div className="date-pos">
                  <div className="date-fltr">
                    <span
                      onClick={() => {
                        setfacilitymodal("add-facility");
                      }}
                    >
                      {/* <LiaCalendar color="#345d3b" size={23} /> */}
                      {/* <img src={calImg} /> */}
                      <span
                        style={{ cursor: "pointer" }}
                        className="date-icon-span"
                      >
                        <i style={{color:"#4C7153"}} class="fa-solid fa-plus"></i>
                      </span>
                      Add Facility
                    </span>
                  </div>
                </div> : ""}
            </div>
          </div>
        </div>
        <div className="dash-main fix-width-for-table">
          <div className="container dash-container">
            <div className="filter-main">
              <div className="filter-left">
                <h4>Clock Punchs</h4>
                <p>Here is a list of all Punchs</p>
              </div>
              <div className="filter-right">
                <CiFilter size={23} />{" "}
                <span className="filter-icon-span">Filter by:</span>
                <div className="date-pos">
                  <div className="date-fltr">
                    <span>
                      {/* <LiaCalendar color="#345d3b" size={23} /> */}
                      {/* <img src={calImg} /> */}
                      <input
                        type="search"
                        name=""
                        onChange={(e) => {
                          setsearch(e.target.value);
                        }}
                        className="searchinput"
                        placeholder="Search Employee"
                        id=""
                      />
                    </span>
                  </div>
                </div>
                <div className="date-pos">
                  <div className="date-fltr">
                    <span>
                      {/* <LiaCalendar color="#345d3b" size={23} /> */}
                      <img src={calImg} />
                      {startdate && enddate ? (
                        <span className="date-icon-span">
                          {startdate} / {enddate}
                        </span>
                      ) : (
                        <span className="date-icon-span">Date</span>
                      )}
                    </span>
                  </div>
                  <div className="col-xl-3  col-lg-4 col-md-4 col-sm-6 mt-2 mt-sm-0">
                    <Dropdown className="dash-main-filter">
                      <Dropdown.Toggle
                        style={{ height: "100%", width: "183%" }}
                      >
                        {/* <input
                        className="date-range-input py-2 pointer ps-3"
                        type="text"
                        // onClick={onToggle}
                        value={`${startdate} - ${enddate}`}
                      /> */}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <DateRange
                          ranges={[selectionRange]}
                          onChange={handleSelect}
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="pos-fltr" onClick={handleClick}>
                  <span>
                    {/* <RiAdminLine color="#345d3b" size={23} /> */}
                    <img src={POS} />
                    <span className="position-icon-span"> {positionname}</span>
                  </span>
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem value={1} onClick={handleClose}>
                    LPN
                  </MenuItem>
                  <MenuItem value={2} onClick={handleClose}>
                    RN
                  </MenuItem>
                </Menu>
                <div className="agcn-fltr">
                  <span>
                    {/* <DiMagento color="#345d3b" size={23} /> */}
                    <img src={AGEN} />
                    <span className="agency-icon-span">{agencyname}</span>
                  </span>
                  <div className="col-xl-3  col-lg-4 col-md-4 col-sm-6 mt-2 mt-sm-0">
                    <Dropdown className="">
                      <Dropdown.Toggle
                        style={{ height: "100%", width: "183%" }}
                      >
                        click
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {agency &&
                          agency.map((it) => {
                            return (
                              <Dropdown.Item
                                onClick={(e) => {
                                  console.log(e.target.value);
                                  setagencyname(it.name);
                                  setagency_id(it._id);
                                }}
                                value={it._id}
                              >
                                {it.name}
                              </Dropdown.Item>
                            );
                          })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="agcn-fltr">
                  <span>
                    {/* <DiMagento color="#345d3b" size={23} /> */}
                    <img src={AGEN} />
                    <span className="agency-icon-span">{facilityName}</span>
                  </span>
                  <div className="col-xl-3  col-lg-4 col-md-4 col-sm-6 mt-2 mt-sm-0">
                    <Dropdown className="">
                      <Dropdown.Toggle
                        style={{ height: "100%", width: "183%" }}
                      >
                        click
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {user &&
                          user.facility.map((it) => {
                            return (
                              <Dropdown.Item
                                onClick={(e) => {
                                  console.log(e.target.value);
                                  setfacility(it._id);
                                  setfacilityName(it.name);
                                }}
                                value={it._id}
                              >
                                {it.name}
                              </Dropdown.Item>
                            );
                          })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="date-pos">
                  <div className="date-fltr">
                    <span
                      onClick={() => {
                        setposition("");
                        setagency_id("");
                        setstartdate("");
                        setenddate("");
                        setpositionname("Position");
                        setagencyname("Agency");
                        setfacilityName(user?.facility[0]?.name);
                        setsearch("");

                        setfacility(user?.facility[0]?._id);
                      }}
                    >
                      {/* <LiaCalendar color="#345d3b" size={23} /> */}
                      {/* <img src={calImg} /> */}
                      <span
                        style={{ cursor: "pointer" }}
                        className="date-icon-span"
                      >
                        <i style={{color:"#4C7153"}} class="fa-solid fa-rotate-right"></i>
                      </span>
                      clear filter
                    </span>
                  </div>
                </div>
                <div className="date-pos">
                  <div className="date-fltr">
                    <span
                      onClick={() => {
                        setposition("");
                        setagency_id("");
                        setstartdate("");
                        setenddate("");
                        setpositionname("Position");
                        setagencyname("Agency");
                        setfacilityName(user?.facility[0]?.name);
                        setsearch("");
                        setModalShow("add");
                        setfacility(user?.facility[0]?._id);
                      }}
                    >
                      {/* <LiaCalendar color="#345d3b" size={23} /> */}
                      {/* <img src={calImg} /> */}
                      <span
                        style={{ cursor: "pointer" }}
                        className="date-icon-span"
                      >
                        <i style={{color:"#4C7153"}} class="fa-solid fa-plus"></i>

                      </span>
                      Add Punch
                    </span>
                  </div>
                </div>

              </div>
            </div>
            <table class="table-fixed">
              <thead>
                <tr className="table-dash">
                  <th>Employee Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Position</th>
                  <th>Facility</th>
                  <th>Type</th>

                  <th>Agency Name</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody className="tbdy-dash">
                {!loading && data
                  ? data.map((it) => {
                    console.log(it);

                    const inputDate = it?.utcTime;
                    const parsedDate = moment(inputDate);
                    const formattedDate = parsedDate.format("MMM DD, YYYY");
                    let time = moment(it?.createdAt).format("h:mm A");
                    return (
                      <tr>
                        <>
                          <td className="td-image">
                            {it?.caregiver?.firstName
                              ? it?.caregiver?.firstName
                              : it?.caregiver?.agencyEmployeeId}
                          </td>
                          <td>{formattedDate}</td>
                          <td>{time}</td>
                          <td>{it?.position === "1" ? "LPN" : "RN"}</td>
                          <td>{it?.facility_id?.name}</td>
                          <td>{it?.type?.toUpperCase()}</td>
                          <td>{it?.agency?.name}</td>
                          <td onClick={() => {
                            setedit_ModalShow(true)
                            dispatch(get_single_punch({ token, id: it._id }))
                          }}>
                            <i class="fa-solid fa-pen-to-square" style={{ cursor: "pointer" }}></i>

                          </td>
                        </>
                      </tr>
                    );
                  })
                  : ""}
              </tbody>
            </table>
            {
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  marginTop: "12px",
                  justifyContent: "center",
                }}
                className=""
              >
                {loading ? (
                  <Spinner animation="grow" />
                ) : (
                  !data?.length && <p>No Punchs Found</p>
                )}
              </div>
            }

            <Modal
              show={modalShow}

              onHide={() => {
                setpunch_fields({
                  agency: "",
                  position: "",
                  type: "",
                  emp_id: ""
                })
                seterr_agency(false)
                seterr_date(false)
                seterr_facility(false)
                seterr_emp_id(false)
                seterr_position(false)
                seterr_punchString(false)
                seterr_type(false)
                setpunch_facility("")
                setpunch_date("")
                setModalShow(false)
              }}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Add Punch
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Box sx={{ width: "100%", typography: "body1" }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab label=" With String" value="1" />
                        <Tab label=" With Fields" value="2" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">


                      <div className="containerPunch">
                        <form onSubmit={(e) => {
                          e.preventDefault()
                          if (!punch_string) {
                            seterr_punchString(true)
                          }
                          if (!punch_facility) {
                            seterr_facility(true)
                          }
                          else if (!punch_facility || !punch_string) {
                            return false
                          } else {
                            dispatch(create_punch({ token, punch: punch_string, facility_id: punch_facility }))
                          }
                        }} action="#">
                          <div class="user__details d-flex">
                            <div class="input__box">
                              <input
                                type="text"
                                placeholder="Enter Punch String"

                                onChange={(e) => {
                                  setpunch_string(e.target.value)
                                }}
                              />
                              {err_punchString ?
                                <span className="err_cls">Punc String Required</span> : ""}
                            </div>

                            <div class="input__box">
                              {/* <input
                                type="text"
                                readOnly
                                placeholder="Facility"
                                required
                              /> */}
                              <FormControl
                                sx={{ m: 1, minWidth: 120 }}
                                size="small"
                              >
                                <InputLabel id="demo-select-small-label">
                                  Facility
                                </InputLabel>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={punch_facility}
                                  label="Facility"
                                  onChange={(e) => {
                                    seterr_facility(false)
                                    setpunch_facility(e.target.value)
                                  }}
                                >

                                  {user &&
                                    user.facility.map((it) => {
                                      return (
                                        <MenuItem value={it._id}>{it.name}</MenuItem>
                                      )
                                    })
                                  }

                                </Select>
                              </FormControl>
                              {err_facility ?
                                <span className="err_cls">facility Required</span> : ""}
                            </div>
                          </div>

                          <div class="button text-center withStrSub ">
                            <button type="submit" value={"Submit"} style={{ backgroundColor: "#345d3b" }}>
                              {create_loading ? <Spinner animation="grow" /> : "Submit"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </TabPanel>
                    <TabPanel value="2">
                      <div className="containerPunch">
                        <form onSubmit={createpunch_withfields} action="#">
                          <div class="user__details ">
                            <div className="row">
                              <div class=" input__boxWithcred">
                                <input
                                  type="number"
                                  placeholder="Employee Id"
                                  name="emp_id"

                                  onChange={handlechange_punch_fields}
                                />

                                {err_emp_id ?
                                  <span className="err_cls">Employee Required</span> : ""
                                }
                              </div>

                              <div class=" input__boxWithcred">
                                <input
                                  type="number"
                                  placeholder="Agency"
                                  name="agency"

                                  onChange={handlechange_punch_fields}
                                />
                                {err_agency ?
                                  <span className="err_cls">Agency Required</span> : ""
                                }
                              </div>
                              <div class=" input__boxWithcred">

                                <DatePicker onChange={(e) => {
                                  console.log(e)
                                  const initialDate = moment(e);
                                  const convertedFormat = initialDate.format("YYYYMMDDhhmmA").toLowerCase();
                                  setpunch_date(convertedFormat)
                                  console.log(convertedFormat);

                                }}
                                  format="yyyy-MM-dd HH:mm:ss" />

                                {err_date ?
                                  <span className="err_cls">Date Required</span> : ""
                                }
                              </div>
                            </div>
                            <div className="row mt-3 rw-withcr">
                              <div class=" input__boxWithcred col-4">
                                <FormControl
                                  sx={{ m: 1, minWidth: 120 }}
                                  size="small"
                                >
                                  <InputLabel id="demo-select-small-label">
                                    Position
                                  </InputLabel>
                                  <Select

                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    // value={}
                                    name="position"
                                    label="Position"
                                    onChange={handlechange_punch_fields}
                                  >
                                    <MenuItem value={"1"}>LPN</MenuItem>
                                    <MenuItem value={"2"}>RN</MenuItem>
                                  </Select>
                                </FormControl>
                                {err_position ?
                                  <span className="err_cls">position Required</span> : ""
                                }
                              </div>

                              <div class=" input__boxWithcred col-4">
                                <FormControl
                                  sx={{ m: 1, minWidth: 120 }}
                                  size="small"
                                >
                                  <InputLabel id="demo-select-small-label">
                                    Type
                                  </InputLabel>
                                  <Select

                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    // value={}
                                    name="type"
                                    label="Type"
                                    onChange={handlechange_punch_fields}
                                  >
                                    <MenuItem value={"In"}>IN</MenuItem>
                                    <MenuItem value={"Out"}>OUT</MenuItem>
                                  </Select>
                                </FormControl>
                                {err_type ?
                                  <span className="err_cls">type Required</span> : ""
                                }
                              </div>
                              <div class="input__boxWithcred col-4">
                                <FormControl
                                  sx={{ m: 1, minWidth: 120 }}
                                  size="small"
                                >
                                  <InputLabel id="demo-select-small-label">
                                    Facility
                                  </InputLabel>
                                  <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={punch_facility}
                                    label="Facility"
                                    onChange={(e) => {
                                      setpunch_facility(e.target.value)
                                    }}
                                  >
                                    {user &&
                                      user.facility.map((it) => {
                                        return (
                                          <MenuItem value={it._id}>{it.name}</MenuItem>
                                        )
                                      })
                                    }
                                  </Select>
                                </FormControl>

                                {err_facility ?
                                  <span className="err_cls">facility Required</span> : ""
                                }
                              </div>
                            </div>
                          </div>

                          <div class="button text-center withStrSub ">
                            <button style={{ backgroundColor: "#345d3b" }} type="submit" value={"Submit"} >
                              {create_loading ? <Spinner animation="grow" /> : "Submit"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </TabPanel>
                  </TabContext>
                </Box>
              </Modal.Body>
            </Modal>


            <Modal
              show={edit_modalShow}

              onHide={close_editmodal}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Edit Punch
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Box sx={{ width: "100%", typography: "body1" }}>



                  {single_punch_loading ?
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Spinner animation="grow" /> </div> :
                    <div className="containerPunch">
                      <form onSubmit={updatepunch} action="#">
                        <div class="user__details ">
                          <div className="row">
                            <div class=" input__boxWithcred">
                              <input
                                type="text"
                                placeholder="Employee Id"
                                name="emp_id"
                                value={punch_fields.emp_id}
                                onChange={handlechange_punch_fields}
                              />

                              {err_emp_id ?
                                <span>Employee Required</span> : ""
                              }
                            </div>

                            <div class=" input__boxWithcred">
                              <input
                                type="text"
                                placeholder="Agency"
                                name="agency"
                                value={punch_fields.agency}
                                onChange={handlechange_punch_fields}
                              />
                              {err_agency ?
                                <span>Agency Required</span> : ""
                              }
                            </div>
                            <div class=" input__boxWithcred">

                              <DatePicker value={punch_date} onChange={(e) => {
                                console.log(e)
                                const initialDate = moment(e);
                                const convertedFormat = initialDate.format("YYYYMMDDhhmmA").toLowerCase();
                                setpunch_date(new Date(initialDate))
                                console.log(convertedFormat);

                              }}
                                format="yyyy-MM-dd HH:mm:ss" />

                              {err_date ?
                                <span>Date Required</span> : ""
                              }
                            </div>
                          </div>
                          <div className="row mt-3 rw-withcr">
                            <div class=" input__boxWithcred col-4">
                              <FormControl
                                sx={{ m: 1, minWidth: 120 }}
                                size="small"
                              >
                                <InputLabel id="demo-select-small-label">
                                  Position
                                </InputLabel>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={punch_fields.position}
                                  name="position"
                                  label="Position"
                                  onChange={handlechange_punch_fields}
                                >
                                  <MenuItem value={"1"}>LPN</MenuItem>
                                  <MenuItem value={"2"}>RN</MenuItem>
                                </Select>
                              </FormControl>
                              {err_position ?
                                <span>Position Required</span> : ""
                              }
                            </div>

                            <div class=" input__boxWithcred col-4">
                              <FormControl
                                sx={{ m: 1, minWidth: 120 }}
                                size="small"
                              >
                                <InputLabel id="demo-select-small-label">
                                  Type
                                </InputLabel>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={punch_fields.type}
                                  name="type"
                                  label="Type"
                                  onChange={handlechange_punch_fields}
                                >
                                  <MenuItem value={"In"}>IN</MenuItem>
                                  <MenuItem value={"Out"}>OUT</MenuItem>
                                </Select>
                              </FormControl>
                              {err_type ?
                                <span>type Required</span> : ""
                              }
                            </div>
                            {/* <div class="input__boxWithcred col-4">
                              <FormControl
                                sx={{ m: 1, minWidth: 120 }}
                                size="small"
                              >
                                <InputLabel id="demo-select-small-label">
                                  Facility
                                </InputLabel>
                                <Select
                                  labelId="demo-select-small-label"
                                  id="demo-select-small"
                                  value={punch_facility}
                                  label="Facility"
                                  onChange={(e) => {
                                    setpunch_facility(e.target.value)
                                  }}
                                >
                                  {user &&
                                    user.facility.map((it) => {
                                      return (
                                        <MenuItem value={it._id}>{it.name}</MenuItem>
                                      )
                                    })
                                  }
                                </Select>
                              </FormControl>
                            </div> */}
                          </div>
                        </div>

                        <div class="button text-center withStrSub ">

                          <button style={{ backgroundColor: "#345d3b" }} type="submit" value={"Submit"} >
                            {create_loading ? <Spinner animation="grow" /> : "Submit"}
                          </button>
                        </div>
                      </form>
                    </div>
                  }


                </Box>
              </Modal.Body>
            </Modal>

            <Modal
              show={facilitymodal === "no_facility"}
              onHide={() => {
                setfacilitymodal(false);
              }}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              backdrop={true}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Warning
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {!user?.company ?
                  <>
                    <h4>Warning</h4>
                    <p>
                      You do not have any Company. Please contact your
                      administrator.
                    </p>
                  </>
                  : <>
                    <h4>Warning</h4>
                    <p>
                      You do not have any facilities. Please contact your
                      administrator.
                    </p>
                  </>}

              </Modal.Body>
              <Modal.Footer>
                {/* <Button onClick={props.onHide}>Close</Button> */}
              </Modal.Footer>
            </Modal>


            <Modal
              show={facilitymodal === "add-facility"}
              onHide={() => {
                setfacilitymodal(false);
              }}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              backdrop={true}
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Add Facility
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="containerPunch">
                  <form onSubmit={add_facility} action="#">
                    <div class="user__details ">
                      <div style={{justifyContent:"center", rowGap: "12px" }} className="row">
                        <div class="input__boxWithcred input__boxWithcred1 input__boxWithcred1">
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={create_facility.name}
                            required
                            onChange={handlechange_create_facility}
                          />


                        </div>

                        <div class=" input__boxWithcred input__boxWithcred1">
                          <input
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            value={create_facility.phone}
                            required
                            onChange={handlechange_create_facility}
                          />

                        </div>



                        <div class=" input__boxWithcred input__boxWithcred1">
                          <input
                            type="text"
                            placeholder="Timezone"
                            name="timezone"
                            value={create_facility.timezone}
                            required
                            onChange={handlechange_create_facility}
                          />

                        </div>

                        <div class=" input__boxWithcred input__boxWithcred1">
                          <input
                            type="text"
                            placeholder="Location Id"
                            name="locationId"
                            value={create_facility.locationId}
                            required
                            onChange={handlechange_create_facility}
                          />

                        </div>

                        <div class=" input__boxWithcred input__boxWithcred1">
                          <input
                            type="text"
                            placeholder="City"
                            name="city"
                            value={create_facility.city}
                            required
                            onChange={handlechange_create_facility}
                          />

                        </div>

                        <div class="input__boxWithcred input__boxWithcred1">
                          <input
                            type="text"
                            placeholder="State"
                            name="state"
                            value={create_facility.state}
                            required
                            onChange={handlechange_create_facility}
                          />
                       
                        </div>
                        <div class="input__boxWithcred input__boxWithcred1">
                            <input placeholder="Address" name="address" value={create_facility.address} onChange={handlechange_create_facility} class="form-control" id="exampleFormControlTextarea1" rows="3"></input>

                          </div>

                      </div>

                    </div>

                    <div class="button text-center withStrSub ">

                      <button style={{ backgroundColor: "#345d3b" }} type="submit" value={"Submit"} >
                        {create_loading === "facilty-create-load" ? <Spinner animation="grow" /> : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </Modal.Body>
              <Modal.Footer>
                {/* <Button onClick={props.onHide}>Close</Button> */}
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
