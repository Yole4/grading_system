import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import BackendURL from '../backend URL/BackendURL';

// icons
import { FaCircleUser } from "react-icons/fa6";
import { HiOutlineDocumentDuplicate, HiOutlineLogout } from "react-icons/hi";
import { FaUsers, FaEyeSlash, FaEye, FaStreetView } from "react-icons/fa";
import { LiaFileSolid } from "react-icons/lia";
import { SlNotebook } from "react-icons/sl";
import { LiaBarsSolid } from "react-icons/lia";
import { FiUser, FiUsers } from "react-icons/fi";
import { FaRegFile } from "react-icons/fa";
import { HiBars3 } from "react-icons/hi2";
import { BiSolidUser } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { GiAutoRepair } from "react-icons/gi";
import { MdDateRange, MdNotificationsNone } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoMdSearch } from "react-icons/io";
import { VscDeviceCamera } from "react-icons/vsc";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FcApprove } from "react-icons/fc";
import { AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import axios from 'axios';

// images
import logo from '../assets/images/logo.png';
import user from '../assets/images/user.png';

function StaffAccount() {

  const navigate = useNavigate();
  //backend url
  const backendUrl = BackendURL();
  // token
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/');
  }

  // response variables
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [recordsIcon, setRecordsIcon] = useState(true);
  const [reportIcon, setReportIcon] = useState(true);
  const [usersIcon, setUsersIcon] = useState(false);
  const [maintenanceIcon, setMaintenanceIcon] = useState(true);
  const [barOnclick, setBarOnClick] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isUserProfileClicked, setIsUserProfileClicked] = useState(false);
  const [deleteAndEdit, setDeleteAndEdit] = useState(false);
  const [logout, setLogout] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [showNotification, setShowNotification] = useState(false);


  // clicked function
  const [isStudentAccount, setIsStudentAccount] = useState(true);
  const [isStaffAccount, setIsStaffAccount] = useState(false);
  const [isStudentList, setIsStudentList] = useState(false);
  const [isPromoteStudent, setIsPromoteStudent] = useState(false);
  const [isSubjectList, setIsSubjectList] = useState(false);
  const [isSchoolYear, setIsSchoolYear] = useState(false);
  const [isGradeList, setIsGradeList] = useState(false);

  // student
  const [isStudentTableEdit, setIsStudentTableEdit] = useState(false);
  const [isStudenTableDelete, setIsStudentTableDelete] = useState(false);

  // list of student
  const [isStudentListTableEdit, setIsStudentListTableEdit] = useState(false);
  const [isStudentListTableDelete, setIsStudentListTableDelete] = useState(false);
  const [isStudentListTableAdd, setIsStudentListTableAdd] = useState(false);
  const [isStudentListProfileEdt, setIsStudentProfileEdt] = useState(false);
  const [isCancelEditing, setIsCancelEditing] = useState(false);
  const [isAddNewStudent, setIsAddNewStudent] = useState(false);

  // Subject list
  const [isSubjectListTableAdd, setIsSubjectListTableAdd] = useState(false);
  const [isSubjectListTableEdit, setIsSubjectListTableEdit] = useState(false);
  const [isSubjectListTableDelete, setIsSubjectListTableDelete] = useState(false);

  // Grade List
  const [isGradeListTableAdd, setIsGradeListTableAdd] = useState(false);
  const [isGradeListTableEdit, setIsGradeListTableEdit] = useState(false);
  const [isGradeListTableDelete, setIsGradeListTableDelete] = useState(false);

  // Universal
  const [selectedRow, setSelectedRow] = useState(null);
  const [checkRowClicked, setCheckRowClicked] = useState(false);
  const [fullnameToDelete, setFullnameToDelete] = useState('');

  // student side buttong clicked function
  const studentButtonClicked = async () => {
    setIsStudentAccount(true);
    setIsStaffAccount(false);
    setIsPromoteStudent(false);
    setIsStudentList(false);
    setIsSubjectList(false);
    setIsSchoolYear(false);
    setIsGradeList(false);
  }

  // Staff account side buttong clicked function
  const staffAccountButtonClicked = async () => {
    setIsStudentAccount(false);
    setIsStaffAccount(true);
    setIsStudentList(false);
    setIsPromoteStudent(false);
    setIsSubjectList(false);
    setIsSchoolYear(false);
    setIsGradeList(false);
  }

  // Student list side buttong clicked function
  const studentListButtonClicked = async () => {
    setIsStudentAccount(false);
    setIsStaffAccount(false);
    setIsStudentList(true);
    setIsPromoteStudent(false);
    setIsSubjectList(false);
    setIsSchoolYear(false);
    setIsGradeList(false);
  }

  // Promote student side buttong clicked function
  const promoteStudentButtonClicked = async () => {
    setIsStudentAccount(false);
    setIsStaffAccount(false);
    setIsStudentList(false);
    setIsPromoteStudent(true);
    setIsSubjectList(false);
    setIsSchoolYear(false);
    setIsGradeList(false);
  }

  // Subject list side buttong clicked function
  const subjectListButtonClicked = async () => {
    setIsStudentAccount(false);
    setIsStaffAccount(false);
    setIsStudentList(false);
    setIsPromoteStudent(false);
    setIsSubjectList(true);
    setIsSchoolYear(false);
    setIsGradeList(false);
  }

  // School Year side buttong clicked function
  const schoolYearButtonClicked = async () => {
    setIsStudentAccount(false);
    setIsStaffAccount(false);
    setIsStudentList(false);
    setIsPromoteStudent(false);
    setIsSubjectList(false);
    setIsSchoolYear(true);
    setIsGradeList(false);
  }

  // Grade list side buttong clicked function
  const gradeListButtonClicked = async () => {
    setIsStudentAccount(false);
    setIsStaffAccount(false);
    setIsStudentList(false);
    setIsPromoteStudent(false);
    setIsSubjectList(false);
    setIsSchoolYear(false);
    setIsGradeList(true);
  }

  // #################################################################  FETCH USER DATA  #############################################################
  // user credentials
  const [userCredentials, setUserCredentials] = useState(null);
  const [autoFetchChecker, setAutoFetchChecker] = useState(false);

  useEffect(() => {
    if (token !== "") {
      const checkProtected = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${backendUrl}/api/protected`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            // setNotLogin(true);
            // setUserId(response.data.user);
            const userId = (response.data.user.id).toString();
            // setUserCredentials(response.data.user);

            const fetchUserCredentials = async () => {
              try {
                const response = await axios.post(`${backendUrl}/api/fetch-user`, { userId }, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
                if (response.status === 200) {
                  setUserCredentials(response.data.message);
                  setStudentInfo({ ...studentInfo, teacher: userId });
                  setUpdateStudentInfo({ ...updateStudentInfo, teacher: userId });
                  setIsLoading(false);
                }
              } catch (error) {
                setIsLoading(false);
                if (error.response && error.response.status === 401) {
                  console.log(error.response.data.message);
                } else {
                  console.log('Error: ', error);
                }
              }
            }
            fetchUserCredentials();
          }

        } catch (error) {
          setIsLoading(false);
          if (error.response && error.response.status === 401) {
            console.log(error.response.data.message);
          } else {
            console.log('Error: ', error);
          }
        }
      }
      checkProtected();
    }
  }, [token, autoFetchChecker]);

  // #################################################################  CHANGE PASSWORD REQUEST  ###################################################################
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const userId = (userCredentials[0].id).toString();
    const requestChangePassword = { userId, password, newPassword, confirmPassword, username };

    try {
      const response = await axios.post(`${backendUrl}/api/change-password`, requestChangePassword, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setIsLoading(false);
        setAutoFetchChecker(autoFetchChecker ? false : true);


        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  // #################################################################  AUTO Profile Upload  ###################################################################
  const [profileUpload, setProfileUpload] = useState([]);
  useEffect(() => {
    if (profileUpload) {
      if (profileUpload.length === 0) {
        // console.log('nothing change!')
      }
      else {
        setIsLoading(true);
        const autoUpload = async () => {

          const requestImageToUpload = new FormData();
          requestImageToUpload.append('image', profileUpload);
          requestImageToUpload.append('userId', userCredentials[0].id);

          try {
            const response = await axios.post(`${backendUrl}/api/auto-image-upload`, requestImageToUpload, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            if (response.status === 200) {
              setIsLoading(false);
              setAutoFetchChecker(autoFetchChecker ? false : true);


              setErrorMessage(response.data.message);
              setIsSuccess(true);

              setTimeout(() => {
                setIsSuccess(false);
              }, 5000);
            }
          } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 401) {
              setErrorMessage(error.response.data.message);
              setIsError(true);

              setTimeout(() => {
                setIsError(false);
              }, 5000);
            } else {
              console.log('Error: ', error);
            }
          }
        };
        autoUpload();
      }
    }
  }, [profileUpload]);

  // ################################################################# FETCH ALL TEACHER STUDENT ACCOUNT REQUEST  ###################################################################
  const [usersStudentAccount, setUsersStudentAccount] = useState([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [checkStudentAccount, setCheckStudentAccount] = useState(false);

  useEffect(() => {
    if (userCredentials) {
      const requestAllUsers = async () => {
        setIsLoading(true);

        const userId = (userCredentials[0].id).toString();

        try {
          const response = await axios.post(`${backendUrl}/api/fetch-all-student-account`, { userId }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            setIsLoading(false);
            setUsersStudentAccount(response.data.message);
          }
        } catch (error) {
          setIsLoading(false);
          console.log('Error: ', error);
        }
      }
      requestAllUsers();
    }
  }, [checkStudentAccount, userCredentials]);

  const usersStudentAccountToSearch = usersStudentAccount.filter(item =>
    item.first_name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    item.middle_name.toLowerCase().includes(studentSearch.toLocaleLowerCase()) ||
    item.last_name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    item.username.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // ################################################################# UPDATE AND DELETE STUDENT ACCOUNT REQUEST  ###################################################################
  const [updateStudentAccount, setUpdateStudentAccount] = useState({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    username: ''
  });

  const studentAccountRowClicked = async (item) => {
    setCheckRowClicked(true);

    setSelectedRow(item.id);
    setUpdateStudentInformationId(item.id);
    setFullnameToDelete(`${item.first_name} ${item.middle_name}. ${item.last_name}`);

    setUpdateStudentAccount({
      username: item.username,
      firstName: item.first_name,
      middleName: item.middle_name,
      lastName: item.last_name,
      username: item.username
    });
  };

  const deleteStudentButton = async (e) => {
    e.stopPropagation();
    if (checkRowClicked) {
      setIsStudentTableDelete(true)
    } else {
      // login for not clicked
    }
  };

  const updateStudentButton = async (e) => {
    e.stopPropagation();
    if (checkRowClicked) {
      setIsStudentTableEdit(true);
    } else {
      // login for not clicked
    }
  }

  const handleUpdateStudentAccount = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updateStaffAccount = updateStudentAccount;
    const userId = selectedRow;
    const updateStudentRequest = { updateStaffAccount, userId };

    try {
      const response = await axios.post(`${backendUrl}/api/update-staff-account`, updateStudentRequest, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setIsLoading(false);
        setCheckStudentAccount(checkStudentAccount ? false : true);

        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  const handleDeleteStudentAccount = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userId = selectedRow;
    try {
      const response = await axios.post(`${backendUrl}/api/delete-account`, { userId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setIsLoading(false);
        setCheckStudentAccount(checkStudentAccount ? false : true);
        setIsStudentTableDelete(false);

        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  // ################################################################# ADD SUBJECT REQUEST  ###################################################################
  const [checkSubject, setCheckSubject] = useState(false);
  const [addSubject, setAddSubject] = useState('');

  const handleAddSubject = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userId = (userCredentials[0].id).toString();
    const requestAddSubject = { addSubject, userId };

    try {
      const response = await axios.post(`${backendUrl}/api/add-subject-byTeacher`, requestAddSubject, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsSubjectListTableAdd(false);
        setCheckSubject(checkSubject ? false : true);

        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  // ################################################################# GET EACH SUBJECT REQUEST  ###################################################################
  const [listSubject, setListSubject] = useState([]);
  const [searchSubject, setSearchSubject] = useState('');
  const [displaySubject, setDisplaySubject] = useState([]);

  useEffect(() => {
    const fetchSubject = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${backendUrl}/api/fetch-all-subject`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setIsLoading(false);
          setListSubject(response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        console.log('Error: ', error);
      }
    };
    fetchSubject();
  }, [checkSubject]);

  // #############################################################  GET ALL TEACHER SUBJECT #########################################
  useEffect(() => {
    if (userCredentials) {
      const fetchSubject = async () => {
        setIsLoading(true);

        try {
          const userId = (userCredentials[0].id).toString();
          const response = await axios.post(`${backendUrl}/api/get-each-subject`, { userId }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            setIsLoading(false);
            setDisplaySubject(response.data.message);
          }
        } catch (error) {
          setIsLoading(false);
          console.log('Error: ', error);
        }
      };
      fetchSubject();
    }
  }, [checkSubject, userCredentials]);

  const subjectToSearch = displaySubject.filter(item =>
    item.subject.toLowerCase().includes(searchSubject.toLowerCase()) ||
    item.applicable_for.toLowerCase().includes(searchSubject.toLowerCase())
  );

  // ###############################################################  UPDATE OR DELETE SUBJECT REQUEST    ######################################################################
  const [subjectUpdateId, setSubjectUpdateId] = useState(null);
  const [updateSubject, setUpdateSubject] = useState({
    subject: '',
    applicableFor: '',
    description: ''
  });

  const subjectListRowClicked = async (item) => {
    setCheckRowClicked(true);

    setSelectedRow(item.id);
    setSubjectUpdateId(item.id);
    setFullnameToDelete(item.subject);

    setUpdateSubject(item.subject);
  };

  const editSubjectButton = async (e) => {
    e.stopPropagation();
    if (checkRowClicked) {
      setIsSubjectListTableEdit(true);
    } else {
      // login for not clicked
    }
  }

  const deleteSubjectButton = async (e) => {
    e.stopPropagation();
    if (checkRowClicked) {
      setIsSubjectListTableDelete(true);
    } else {
      // login for not clicked
    }
  }

  const handleDeleteSubject = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updateId = selectedRow;

    try {
      const response = await axios.post(`${backendUrl}/api/delete-each-subject`, { updateId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsSubjectListTableDelete(false);
        setCheckSubject(checkSubject ? false : true);

        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  const handleUpdateSubject = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updateId = selectedRow;
    const teacher_id = (userCredentials[0].id).toString();
    const requestToUpdateSubject = { updateSubject, updateId, teacher_id };

    try {
      const response = await axios.post(`${backendUrl}/api/update-each-subject`, requestToUpdateSubject, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setIsLoading(false);
        setCheckSubject(checkSubject ? false : true);
        setIsSubjectListTableEdit(false);

        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  // ################################################################# ADD NEW STUDENT REQUEST  ###################################################################
  const [studentInfo, setStudentInfo] = useState({
    LRN: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    civilStatus: '',
    phoneNumber: '',
    religion: '',
    birthPlace: '',
    address: '',
    dateOfBirth: '',
    parentOrGuardian: '',
    curriculumn: '',
    teacher: '',
    grade: '',
    SY: '',
    subject: ''
  });
  const [newStudentChecker, setNewStudentChecker] = useState(false);

  const addNewStudent = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userId = (userCredentials[0].id).toString();
    const requestToAddNewStudent = { studentInfo, userId };

    try {
      const response = await axios.post(`${backendUrl}/api/add-new-student`, requestToAddNewStudent, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setIsLoading(false);
        setNewStudentChecker(newStudentChecker ? false : true);
        setIsStudentListTableAdd(false);
        setIsAddNewStudent(false);
        setCheckStudentAccount(checkStudentAccount ? false : true);
        setStudentInfo({
          LRN: '',
          firstName: '',
          middleName: '',
          lastName: '',
          gender: '',
          civilStatus: '',
          phoneNumber: '',
          religion: '',
          birthPlace: '',
          address: '',
          dateOfBirth: '',
          parentOrGuardian: '',
          curriculumn: '',
          grade: '',
          SY: '',
          subject: ''
        });

        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  // ################################################################# FETCH ALL STUDENT REQUEST  ###################################################################
  const [usersInformation, setUsersInformation] = useState([]);
  const [studentInformationSearch, setStudentInformationSearch] = useState('');

  useEffect(() => {
    if (userCredentials) {
      const fetchUserInfo = async () => {
        setIsLoading(true);
        try {
          const userId = (userCredentials[0].id).toString();
          const response = await axios.post(`${backendUrl}/api/fetch-users-byID`, { userId }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            setIsLoading(false);
            setUsersInformation(response.data.message);
          }

        } catch (error) {
          setIsLoading(false);
          console.log("Error: ", error);
        }
      };
      fetchUserInfo();
    }
  }, [newStudentChecker, userCredentials]);

  const studentInformationToSearch = usersInformation.filter(item =>
    item.first_name.toLowerCase().includes(studentInformationSearch.toLowerCase()) ||
    item.middle_name.toLowerCase().includes(studentInformationSearch.toLocaleLowerCase()) ||
    item.last_name.toLowerCase().includes(studentInformationSearch.toLowerCase()) ||
    item.lrn.toLowerCase().includes(studentInformationSearch.toLowerCase()) ||
    item.curriculumn.toLowerCase().includes(studentInformationSearch.toLowerCase())
  );

  // ################################################################# UPDATE AND DELETE SELECTED ROW STUDENT INFORMATION  ###################################################################
  const [updateStudentInfo, setUpdateStudentInfo] = useState({
    LRN: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    civilStatus: '',
    phoneNumber: '',
    religion: '',
    birthPlace: '',
    address: '',
    dateOfBirth: '',
    parentOrGuardian: '',
    curriculumn: '',
    teacher: userCredentials && (userCredentials[0].id).toString(),
    grade: '',
    SY: '',
    subject: ''
  });
  const [updateStudentInformationId, setUpdateStudentInformationId] = useState('');

  const studentInformationRowClicked = async (item) => {
    setCheckRowClicked(true);

    setSelectedRow(item.id);
    setUpdateStudentInformationId(item.id);
    setFullnameToDelete(`${item.first_name} ${item.middle_name}. ${item.last_name}`);

    setUpdateStudentInfo({
      LRN: item.lrn,
      firstName: item.first_name,
      middleName: item.middle_name,
      lastName: item.last_name,
      gender: item.gender,
      civilStatus: item.civil_status,
      phoneNumber: item.phone_number,
      religion: item.religion,
      birthPlace: item.birth_place,
      address: item.address,
      dateOfBirth: item.date_of_birth,
      parentOrGuardian: item.parent_guardian,
      curriculumn: item.curriculumn,
      teacher: userCredentials && (userCredentials[0].id).toString(),
      grade: item.grade,
      SY: item.school_year,
      subject: item.subject
    });
  };

  const viewProfileOrUpdate = async (e) => {
    e.stopPropagation();
    if (checkRowClicked) {
      setIsStudentListTableEdit(true);
    } else {
      // login for not clicked
    }
  }

  const deleteStudentInformation = async (e) => {
    e.stopPropagation();
    if (checkRowClicked) {
      setIsStudentListTableDelete(true);
    } else {
      // login for not clicked
    }
  }

  const updateStudentInformation = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updateId = selectedRow;
    const requestToUpdateInfo = { updateStudentInfo, updateId };

    try {
      const response = await axios.post(`${backendUrl}/api/update-new-student`, requestToUpdateInfo, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setIsLoading(false);
        setNewStudentChecker(newStudentChecker ? false : true);
        setIsStudentProfileEdt(false);


        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  const handleSubmitDeleteStudentInformation = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const deleteId = updateStudentInformationId;

    try {
      const response = await axios.post(`${backendUrl}/api/delete-student-info`, { deleteId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setIsLoading(false);
        setNewStudentChecker(newStudentChecker ? false : true);
        setIsStudentListTableDelete(false);


        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  // ################################################################# ADD GRADE REQUEST  ###################################################################
  const [checkGrade, setCheckGrade] = useState(false);
  const [addGradeList, setAddGradeList] = useState('');

  const handleAddGradeList = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userId = (userCredentials[0].id).toString();
    const requestGrade = { addGradeList, userId };

    try {
      const response = await axios.post(`${backendUrl}/api/add-grade-byTeacher`, requestGrade, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsGradeListTableAdd(false);
        setCheckGrade(checkGrade ? false : true);

        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  // ###############################################################  UPDATE OR DELETE GRADE REQUEST    ######################################################################
  const [gradeListId, setGradeListId] = useState(null);
  const [updateGradeList, setUpdateGradeList] = useState('');

  const gradeListRowClicked = async (item) => {
    setCheckRowClicked(true);

    setSelectedRow(item.id);
    setGradeListId(item.id);
    setFullnameToDelete(item.grade);

    setUpdateGradeList(item.grade);
  };

  const editGradeListButton = async (e) => {
    e.stopPropagation();
    if (checkRowClicked) {
      setIsGradeListTableEdit(true);
    } else {
      // login for not clicked
    }
  }

  const deleteGradeListButton = async (e) => {
    e.stopPropagation();
    if (checkRowClicked) {
      setIsGradeListTableDelete(true);
    } else {
      // login for not clicked
    }
  }

  const handleDeleteGradeList = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updateId = selectedRow;

    try {
      const response = await axios.post(`${backendUrl}/api/delete-each-grade`, { updateId }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsGradeListTableDelete(false);
        setCheckGrade(checkGrade ? false : true);

        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  const handleEditGradeList = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updateId = selectedRow;
    const teacher_id = (userCredentials[0].id).toString();
    const requestUpdateGrade = { updateGradeList, updateId, teacher_id };

    try {
      const response = await axios.post(`${backendUrl}/api/update-each-grade`, requestUpdateGrade, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setIsLoading(false);
        setCheckGrade(checkGrade ? false : true);
        setIsGradeListTableEdit(false);

        setErrorMessage(response.data.message);
        setIsSuccess(true);

        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        setErrorMessage(error.response.data.message);
        setIsError(true);

        setTimeout(() => {
          setIsError(false);
        }, 5000);
      } else {
        console.log('Error: ', error);
      }
    }
  };

  // ################################################################# GET ALL GRADE REQUEST  ###################################################################
  const [listGrade, setListGrade] = useState([]);
  const [searchGradeList, setSearchGradeList] = useState('');
  const [displayGrade, setDisplayGrade] = useState([]);

  useEffect(() => {
    const fetchGrade = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${backendUrl}/api/fetch-all-grade`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setIsLoading(false);
          setListGrade(response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        console.log('Error: ', error);
      }
    };
    fetchGrade();
  }, [checkGrade]);


  // #########################################################    GET ALL TEACHER GRADE LIST  #####################################################
  useEffect(() => {
    if (userCredentials) {
      const fetchGrade = async () => {
        setIsLoading(true);

        try {
          const userId = (userCredentials[0].id).toString();
          const response = await axios.post(`${backendUrl}/api/get-each-grade`, { userId }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            setIsLoading(false);
            setDisplayGrade(response.data.message);
          }
        } catch (error) {
          setIsLoading(false);
          console.log('Error: ', error);
        }
      };
      fetchGrade();
    }
  }, [checkGrade, userCredentials]);

  const gradeListToSearch = displayGrade.filter(item =>
    (item.grade).toString().toLowerCase().includes(searchGradeList.toLowerCase())
  );

  // ################################################################# GET ALL SCHOOL YEAR REQUEST  ###################################################################
  const [listSchoolYear, setListSchoolYear] = useState([]);
  const [searchSY, setSearchSY] = useState('');

  useEffect(() => {
    const fetchSY = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${backendUrl}/api/fetch-all-school-year`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.status === 200) {
          setIsLoading(false);
          setListSchoolYear(response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        console.log('Error: ', error);
      }
    };
    fetchSY();
  }, []);


  // ################################################################# FETCH ALL STUDENT USER NOTIFICATION  ###################################################################
  const [myNotifications, setMyNotifications] = useState([]);

  useEffect(() => {
    if (userCredentials) {
      const fetchNotification = async () => {
        setIsLoading(true);
        const userId = (userCredentials[0].id).toString();
        try {
          const response = await axios.post(`${backendUrl}/api/notification`, { userId }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.status === 200) {
            setIsLoading(false);
            setMyNotifications(response.data.message);
          }
        } catch (error) {
          setIsLoading(false);
          console.log("Error: ", error);
        }
      }
      fetchNotification();
    }
  }, [newStudentChecker, userCredentials, checkStudentAccount]);

  const [reversedArray, setReversedArray] = useState([]);
  const [notificationFive, setNotificationFive] = useState([]);
  const [unseen, setUnseen] = useState(null);

  // notification condition
  useEffect(() => {
    if (myNotifications) {
      // Get 5 length of array
      const sortedArray = [...myNotifications].reverse();
      const notificationArray = sortedArray.slice(0, 5);

      setReversedArray(sortedArray);
      setNotificationFive(notificationArray);

      // Count notifications with 'seen' equal to 0
      const unseenCount = myNotifications.filter(item => item.seen === 0).length;

      // Update the 'unseen' state
      setUnseen(unseenCount);
    }
  }, [myNotifications]);

  return (
    <div className='account-container' onClick={(e) => { setIsProfile(false); setCheckRowClicked(false); setSelectedRow(null); setShowNotification(false) }}>
      {/* <div className='account-container' onClick={(e) => { setIsProfile(false); setCheckRowClicked(false); setSelectedRow(null) }}> */}
      <div className={barOnclick ? 'header body-header' : 'header'}>
        <div className='bars'>
          <span><HiBars3 size={40} onClick={() => setBarOnClick(barOnclick ? false : true)} /></span>
        </div>
        <div className='title-label'>
          <span>MABES | Grading System</span>
        </div>
        <div className='profile' onClick={(e) => { e.stopPropagation(); setIsProfile(isProfile ? false : true); setShowNotification(false) }}>
          {/* <FaCircleUser size={30} /> */}
          <img src={userCredentials && userCredentials[0].image ? `${backendUrl}/assets/image uploads/${userCredentials[0].image}` : user} height={30} width={30} style={{ borderRadius: '50%' }} />
        </div>
        <div className="profile-list" style={{ display: isProfile ? 'block' : 'none' }}>
          <div className="profile-parent" style={{ marginTop: '0' }} onClick={() => setIsUserProfileClicked(isUserProfileClicked ? false : true)}>
            <BiSolidUser size={25} />
            <span>{userCredentials && `${userCredentials[0].first_name} ${userCredentials[0].middle_name} ${userCredentials[0].last_name}`}</span>
          </div>
          <div className="profile-parent" style={{ marginBottom: '10px' }} onClick={() => { setChangePassword(changePassword ? false : true); setUsername(userCredentials[0].username) }}>
            <LuSettings size={25} />
            <span>Change Password</span>
          </div>
          <hr />
          <div className="profile-parent" onClick={() => setLogout(true)}>
            <HiOutlineLogout size={25} />
            <span>Logout</span>
          </div>
        </div>

        {/* notification side */}
        <div className='notification-icon profile' onClick={(e) => e.stopPropagation()}>
          <div onClick={() => { setShowNotification(showNotification ? false : true); setIsProfile(false) }}>
            <MdNotificationsNone className='not-icon' size={30} />
          </div>
          <div className="notification-number">
            <span>{unseen !== 0 ? unseen : ''}</span>

            <div style={{ display: showNotification ? 'block' : 'none' }}>
              <div className="notification-list">
                <div className="not-found">
                  <span>{unseen} Notification</span>
                </div>
                <hr />
                {notificationFive.length > 0 ? (
                  notificationFive.map((item) => (
                    <div className="five-not-list" key={item.id}>
                      <MdNotificationsNone className='left-not' size={25} />
                      <div className="not-text">
                        <span>{item.content}</span>
                        <div style={{ display: 'block', marginTop: '7px', fontSize: '13px' }}>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <span>No notification found</span>
                )}
                <hr />
                <div className="not-found">
                  <span>See All Notifications</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className={barOnclick ? 'side-bar update-side-bar' : 'side-bar'} style={{ animation: barOnclick ? 'barReverse .3s linear' : '' }}>
        <div className='user-type'>
          <div className="user-span">
            <img src={logo} height={50} width={50} alt="" />
            <label>Staff</label>
          </div>
          <div className="close-bar" onClick={() => setBarOnClick(true)}>
            <AiOutlineClose size={26} />
          </div>
        </div>
        <hr className='hr' />

        <div className="user-type top" onClick={() => setIsUserProfileClicked(isUserProfileClicked ? false : true)}>
          <img src={userCredentials && userCredentials[0].image ? `${backendUrl}/assets/image uploads/${userCredentials[0].image}` : user} height={50} width={50} alt="" style={{ borderRadius: '50%' }} />
          <span>{userCredentials && `${userCredentials[0].first_name} ${userCredentials[0].middle_name} ${userCredentials[0].last_name}`}</span>
        </div>

        <hr className='hr' />

        <div className="side-parent" style={{ padding: usersIcon ? '' : '0px 10px 10px 0px' }}>
          <div className="form-control side" onClick={() => setUsersIcon(usersIcon ? false : true)}>
            <FaUsers size={20} />
            <span>My Student</span>
            {usersIcon ? (
              <IoIosArrowDown className='font-icon' size={20} />
            ) : (
              <IoIosArrowUp className='font-icon' size={20} />
            )}
          </div>
          {displayGrade && displayGrade.map(item => (
            <div style={{ display: usersIcon ? 'none' : 'block' }} key={item.id}>
              <div className='side-list'>
                <FiUsers size={18} />
                <span>Grade {item.grade}</span>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="side-parent" style={{ padding: usersIcon ? '' : '0px 10px 10px 0px' }}>
                    <div className="form-control side" onClick={() => setUsersIcon(usersIcon ? false : true)}>
                        <LiaFileSolid size={20} />
                        <span>Add Users</span>
                        {usersIcon ? (
                            <IoIosArrowDown className='font-icon' size={20} />
                        ) : (
                            <IoIosArrowUp className='font-icon' size={20} />
                        )}
                    </div>
                    <div style={{ display: usersIcon ? 'none' : 'block' }}>
                        <div className="side-list">
                            <HiOutlineDocumentDuplicate size={18} />
                            <span>Add Student</span>
                        </div>
                        <div className="side-list">
                            <FiUser size={18} />
                            <span>Promote Candidates</span>
                        </div>
                        <div className="side-list">
                            <FaUsers size={18} />
                            <span>Candidates List</span>
                        </div>
                    </div>
                </div> */}

        <div className="side-parent" style={{ padding: recordsIcon ? '' : '0px 10px 10px 0px' }}>
          <div className="form-control side" onClick={() => setRecordsIcon(recordsIcon ? false : true)}>
            <LiaFileSolid size={20} />
            <span>Records</span>
            {recordsIcon ? (
              <IoIosArrowDown className='font-icon' size={20} />
            ) : (
              <IoIosArrowUp className='font-icon' size={20} />
            )}
          </div>
          <div style={{ display: recordsIcon ? 'none' : 'block' }}>
            <div className={isStudentList ? 'side-list add-button-background' : 'side-list'} onClick={studentListButtonClicked}>
              <FiUsers size={18} />
              <span>Student List</span>
            </div>
            <div className={isPromoteStudent ? 'side-list add-button-background' : 'side-list'} onClick={promoteStudentButtonClicked}>
              <FiUser size={18} />
              <span>Promote Student</span>
            </div>
          </div>
        </div>

        <div className="side-parent" style={{ padding: maintenanceIcon ? '' : '0px 10px 10px 0px' }}>
          <div className="form-control side" onClick={() => setMaintenanceIcon(maintenanceIcon ? false : true)}>
            <GiAutoRepair size={20} />
            <span>Maintenance</span>
            {maintenanceIcon ? (
              <IoIosArrowDown className='font-icon' size={20} />
            ) : (
              <IoIosArrowUp className='font-icon' size={20} />
            )}
          </div>
          <div style={{ display: maintenanceIcon ? 'none' : 'block' }}>
            <div className={isGradeList ? 'side-list add-button-background' : 'side-list'} onClick={gradeListButtonClicked}>
              <LiaFileSolid size={18} />
              <span>Add New Grade</span>
            </div>
            <div className={isSubjectList ? 'side-list add-button-background' : 'side-list'} onClick={subjectListButtonClicked}>
              <SlNotebook size={18} />
              <span>Add New Subject</span>
            </div>
          </div>
        </div>

        {/* <div className="side-parent" style={{ padding: reportIcon ? '' : '0px 10px 10px 0px' }}>
                    <div className="form-control side" onClick={() => setReportIcon(reportIcon ? false : true)}>
                        <LiaFileSolid size={20} />
                        <span>Reports</span>
                        {reportIcon ? (
                            <IoIosArrowDown className='font-icon' size={20} />
                        ) : (
                            <IoIosArrowUp className='font-icon' size={20} />
                        )}
                    </div>
                    <div style={{ display: reportIcon ? 'none' : 'block' }}>
                        <div className="side-list">
                            <FiUser size={18} />
                            <span>Promote Student</span>
                        </div>
                        <div className="side-list">
                            <FiUsers size={18} />
                            <span>Student List</span>
                        </div>
                        <div className="side-list">
                            <SlNotebook size={18} />
                            <span>Subject List</span>
                        </div>
                    </div>
                </div> */}

        <div className={isStudentAccount ? 'side-parent add-button-background' : 'side-parent'} onClick={studentButtonClicked}>
          <div className="form-control side" >
            <FaUsers size={20} />
            <span>Student Account</span>
          </div>
        </div>

        <div className="side-parent">
          <div className="form-control side" >
            <TfiAnnouncement size={20} />
            <span>Announcement</span>
          </div>
        </div>
      </div>

      <div className={barOnclick ? 'body-area body-header' : 'body-area'} onClick={() => setIsProfile(false)}>
        <div className="body-side">
          <div className="header-none">
          </div>

          {/* #################################################   STUDENT ACCOUNT SIDE    ############################################## */}
          <div className="header-label" style={{ display: isStudentAccount ? 'block' : 'none' }}>
            <div className="user-header" style={{ display: 'flex' }}>
              <span>Student Account</span>
              <select style={{ marginLeft: '15px', borderRadius: '4px', width: '120px', fontSize: '14px', padding: '4px', borderColor: 'lightblue', height: '30px' }} >
                {displaySubject && displaySubject.map(item => (
                  <option key={item.id} value={item.subject}>{item.subject}</option>
                ))}
              </select>
            </div>
            <hr />
            <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center', marginRight: '30px' }}>
              <input placeholder='Search on table...' value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} type="text" className='additional-user' /><span style={{ padding: '0px', border: '1px solid lightblue', fontSize: '20px', width: '30px' }}><IoMdSearch style={{ marginLeft: '5px', marginTop: '5px', cursor: 'pointer' }} /></span>
              <div className='delete-edit' >
                <div className="delete-button" onClick={deleteStudentButton} >
                  <RiDeleteBin6Line className='delete-icon' /><button> DELETE</button>
                </div>
                <div className="edit-button" onClick={updateStudentButton}>
                  <TbEdit className='edit-icon' /><button >EDIT</button>
                </div>
              </div>
            </div>

            <div className="table">
              <table>
                <thead>
                  <th>No.</th>
                  <th>LRN</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Last Name</th>
                </thead>
                <tbody>

                  {usersStudentAccountToSearch.length === 0 ? (
                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '20px' }}>
                      <span>No Student Account found!</span>
                    </div>
                  ) : (
                    usersStudentAccountToSearch.map((item, index) => (
                      <tr className={selectedRow === item.id ? 'tr selected' : 'tr'} onClick={(e) => { studentAccountRowClicked(item); e.stopPropagation() }} key={item.id} style={{ backgroundColor: deleteAndEdit ? 'rgb(135, 168, 178)' : '' }} >
                        <td style={{ fontWeight: 'bold' }}>{index + 1}.</td>
                        <td>{item.username}</td>
                        <td>{item.first_name}</td>
                        <td>{item.middle_name}</td>
                        <td>{item.last_name}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Manage account */}
            <div className="popup-modal-profile popup-student" style={{ visibility: isStudentTableEdit ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: isStudentTableEdit ? 'dropBottom .3s linear' : '' }}>

                <div className="popup-edit">
                  <span>Manage Account</span>
                </div>
                <hr />
                <form onSubmit={handleUpdateStudentAccount}>
                  <div className="form-control manage-account">
                    <span>LRN</span>
                    <input type="text" value={updateStudentAccount.username} onChange={(e) => setUpdateStudentAccount((prev) => ({ ...prev, username: e.target.value }))} placeholder='LRN' className='form-input manage-account' style={{ height: '35px' }} />
                  </div>
                  <div className="form-control manage-account">
                    <span>First Name</span>
                    <input type="text" placeholder='First Name' value={updateStudentAccount.firstName} onChange={(e) => setUpdateStudentAccount((prev) => ({ ...prev, firstName: e.target.value }))} className='form-input manage-account' style={{ height: '35px' }} />
                  </div>
                  <div className="form-control manage-account">
                    <span>Middle Name</span>
                    <input type="text" placeholder='Middle Nmae' value={updateStudentAccount.middleName} onChange={(e) => setUpdateStudentAccount((prev) => ({ ...prev, middleName: e.target.value }))} className='form-input manage-account' style={{ height: '35px' }} />
                  </div>
                  <div className="form-control manage-account">
                    <span>Last Name</span>
                    <input type="text" placeholder='Last Name' value={updateStudentAccount.lastName} onChange={(e) => setUpdateStudentAccount((prev) => ({ ...prev, lastName: e.target.value }))} className='form-input manage-account' style={{ height: '35px' }} />
                  </div>
                  <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                    <button className='cancel-button' onClick={() => setIsStudentTableEdit(false)} type='button'>Cancel</button>
                    <button className='update-button' type='submit'>Update</button>
                  </div>
                </form>
              </div>
            </div>

            <div className="popup-modal-profile popup-student" style={{ visibility: isStudenTableDelete ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: isStudenTableDelete ? 'dropBottom .3s linear' : '' }}>

                <form onSubmit={handleDeleteStudentAccount}>
                  <div className="popup-edit">
                    <span>Delete?</span>
                  </div>
                  <hr />
                  <div className="form-control manage-account">
                    <span>Are you sure you wan't to delete {fullnameToDelete}?</span>
                  </div>
                  <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                    <button className='update-button' onClick={() => setIsStudentTableDelete(false)} type='button'>Cancel</button>
                    <button className='cancel-button' type='submit'>Delete</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* ################################################    SUBJECT LIST SIDE  ##################################################### */}
          <div className="header-label" style={{ display: isSubjectList ? 'block' : 'none' }}>
            <div className="user-header" style={{ display: 'flex' }}>
              <span>Subjects</span>
              <div className="add-button" onClick={() => setIsSubjectListTableAdd(true)}>
                <button>Add Subject</button>
              </div>
            </div>
            <hr />
            <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center', marginRight: '30px' }}>
              <input placeholder='Search on table...' value={searchSubject} onChange={(e) => setSearchSubject(e.target.value)} type="text" className='additional-user' /><span style={{ padding: '0px', border: '1px solid lightblue', fontSize: '20px', width: '30px' }}><IoMdSearch style={{ marginLeft: '5px', marginTop: '5px', cursor: 'pointer' }} /></span>
              <div className='delete-edit' >
                <div className="delete-button" onClick={deleteSubjectButton} >
                  <RiDeleteBin6Line className='delete-icon' /><button> DELETE</button>
                </div>
                <div className="edit-button" onClick={editSubjectButton}>
                  <TbEdit className='edit-icon' /><button >EDIT</button>
                </div>
              </div>
            </div>

            <div className="table">
              <table>
                <thead>
                  <th>Subjects</th>
                </thead>
                <tbody>
                  {subjectToSearch.length === 0 ? (
                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '20px' }}>
                      <span>No subject found!</span>
                    </div>
                  ) : (
                    subjectToSearch.map(item => (
                      // <tr className='tr' key={item.id} style={{ backgroundColor: deleteAndEdit ? 'rgb(135, 168, 178)' : '' }}>
                      <tr className={selectedRow === item.id ? 'tr selected' : 'tr'} onClick={(e) => { subjectListRowClicked(item); e.stopPropagation() }} key={item.id} style={{ backgroundColor: deleteAndEdit ? 'rgb(135, 168, 178)' : '' }} >
                        <td>{item.subject}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Manage Account Popup */}
            <div className="popup-modal-profile popup-student" style={{ visibility: isSubjectListTableEdit ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: isSubjectListTableEdit ? 'dropBottom .3s linear' : '' }}>

                <div className="popup-edit">
                  <span>Edit Subject</span>
                </div>
                <hr />
                <form onSubmit={handleUpdateSubject}>
                  <div className="form-control manage-account">
                    <span>Subject</span>
                    <select className='form-input manage-account' style={{ height: '35px' }} value={updateSubject} onChange={(e) => setUpdateSubject(e.target.value)}>
                      <option value="" selected disabled>Select Grade</option>
                      {listSubject && listSubject.map(item => (
                        <option key={item.id} value={item.subject}>{item.subject}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                    <button className='cancel-button' onClick={() => setIsSubjectListTableEdit(false)} type='button'>Cancel</button>
                    <button className='update-button' type='submit'>Update</button>
                  </div>
                </form>
              </div>
            </div>

            {/* Delete Account Popup */}
            <div className="popup-modal-profile popup-student" style={{ visibility: isSubjectListTableDelete ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: isSubjectListTableDelete ? 'dropBottom .3s linear' : '' }}>

                <div className="popup-edit">
                  <span>Delete?</span>
                </div>
                <hr />
                <form onSubmit={handleDeleteSubject}>
                  <div className="form-control manage-account">
                    <span>Are you sure you wan't to delete {fullnameToDelete}?</span>
                  </div>
                  <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                    <button className='update-button' onClick={() => setIsSubjectListTableDelete(false)} type='button'>Cancel</button>
                    <button className='cancel-button' type='submit'>Delete</button>
                  </div>
                </form>
              </div>
            </div>

            {/* Add Account Popup */}
            <div className="popup-modal-profile popup-student" style={{ visibility: isSubjectListTableAdd ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: isSubjectListTableAdd ? 'dropBottom .3s linear' : '' }}>

                <div className="popup-edit">
                  <span>Add Subject</span>
                </div>
                <hr />
                <form onSubmit={handleAddSubject}>
                  <select className='form-input manage-account' style={{ height: '35px' }} value={addSubject} onChange={(e) => setAddSubject(e.target.value)}>
                    <option value="" selected disabled>Select Grade</option>
                    {listSubject && listSubject.map(item => (
                      <option key={item.id} value={item.subject}>{item.subject}</option>
                    ))}
                  </select>
                  <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                    <button className='cancel-button' onClick={() => setIsSubjectListTableAdd(false)} type='button'>Cancel</button>
                    <button className='update-button' type='submit'>Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* ############################################    STUDENT LIST SIDE    ################################# */}
          <div className="header-label" style={{ display: isStudentList ? 'block' : 'none' }}>
            <div className="user-header" style={{ display: 'flex' }}>
              <span>Student List</span>
              <div className="add-button" onClick={() => setIsAddNewStudent(true)}>
                <button>Add New Student</button>
              </div>
            </div>
            <hr />
            <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center', marginRight: '30px' }}>
              <input placeholder='Search on table...' value={studentInformationSearch} onChange={(e) => setStudentInformationSearch(e.target.value)} type="text" className='additional-user' /><span style={{ padding: '0px', border: '1px solid lightblue', fontSize: '20px', width: '30px' }}><IoMdSearch style={{ marginLeft: '5px', marginTop: '5px', cursor: 'pointer' }} /></span>
              <div className='delete-edit' >
                <div className="delete-button" onClick={deleteStudentInformation} >
                  <RiDeleteBin6Line className='delete-icon' /><button> DELETE</button>
                </div>
                <div className="edit-button" onClick={viewProfileOrUpdate}>
                  <FaStreetView className='edit-icon' /><button >Profile</button>
                </div>
              </div>
            </div>

            <div className="table">
              <table>
                <thead>
                  <th>No</th>
                  <th>LRN</th>
                  <th>Full Name</th>
                  <th>Curriculumn</th>
                </thead>
                <tbody>
                  {studentInformationToSearch.length === 0 ? (
                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '20px' }}>
                      <span>No users account found!</span>
                    </div>
                  ) : (
                    studentInformationToSearch.map((item, index) => (
                      // <tr className='tr' key={item.id} style={{ backgroundColor: deleteAndEdit ? 'rgb(135, 168, 178)' : '' }}>
                      <tr className={selectedRow === item.id ? 'tr selected' : 'tr'} onClick={(e) => { studentInformationRowClicked(item); e.stopPropagation() }} key={item.id} style={{ backgroundColor: deleteAndEdit ? 'rgb(135, 168, 178)' : '' }} >
                        <td style={{ fontWeight: 'bold' }}>{index + 1}.</td>
                        <td>{item.lrn}</td>
                        <td>{`${item.first_name} ${item.middle_name[0]} ${item.last_name}`}</td>
                        <td>{item.curriculumn}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* SELECT GRADE AND TEACHER */}
            <div className="popup-modal-profile popup-student" style={{ visibility: isAddNewStudent ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: isAddNewStudent ? 'dropBottom .3s linear' : '' }}>

                <form >
                  <div className="popup-edit">
                    <span>Add New Student</span>
                  </div>
                  <hr />
                  <div className="form-control manage-account">
                    <span>School Year</span>
                    <select className="form-input manage-account" value={studentInfo.SY} onChange={(e) => setStudentInfo((prev) => ({ ...prev, SY: e.target.value }))} required>
                      <option value="" selected disabled>Select S.Y.</option>
                      {listSchoolYear && listSchoolYear.map(item => (
                        <option key={item.id} value={item.school_year}>{item.school_year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control manage-account">
                    <span>Grade</span>
                    <select className="form-input manage-account" value={studentInfo.grade} onChange={(e) => setStudentInfo((prev) => ({ ...prev, grade: e.target.value }))} required>
                      <option value="" selected disabled>Select Grade</option>
                      {displayGrade && displayGrade.map(item => (
                        <option key={item.id} value={item.grade}>{item.grade}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control manage-account">
                    <span>Subject</span>
                    <select className="form-input manage-account" value={studentInfo.subject} onChange={(e) => setStudentInfo((prev) => ({ ...prev, subject: e.target.value }))} required>
                      <option value="" selected disabled>Select Subject</option>
                      {displaySubject && displaySubject.map(item => (
                        <option key={item.id} value={item.subject}>{item.subject}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control manage-account">
                    <span>Curriculumn</span>
                    <select className="form-input manage-account" value={studentInfo.curriculumn} onChange={(e) => setStudentInfo((prev) => ({ ...prev, curriculumn: e.target.value }))}>
                      <option value="" selected disabled>Select Curriculumn</option>
                      <option value="Regular">Regular</option>
                      <option value="N/A">N/A</option>
                    </select>
                  </div>
                  <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                    <button className='cancel-button' onClick={() => setIsAddNewStudent(false)} type='button'>Cancel</button>
                    <button className='update-button' type='button' onClick={() => studentInfo.grade !== '' && studentInfo.SY !== '' && studentInfo.subject !== '' && studentInfo.curriculumn !== '' ? setIsStudentListTableAdd(true) : alert("Please select provided entry!")}>Continue</button>
                  </div>
                </form>
              </div>
            </div>

            {/* Delete Account Popup */}
            <div className="popup-modal-profile popup-student" style={{ visibility: isStudentListTableDelete ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: isStudentListTableDelete ? 'dropBottom .3s linear' : '' }}>

                <form onSubmit={handleSubmitDeleteStudentInformation}>
                  <div className="popup-edit">
                    <span>Delete?</span>
                  </div>
                  <hr />
                  <div className="form-control manage-account">
                    <span>Are you sure you wan't to delete {fullnameToDelete}?</span>
                  </div>
                  <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                    <button className='update-button' onClick={() => setIsStudentListTableDelete(false)} type='button'>Cancel</button>
                    <button className='cancel-button' type='submit'>Delete</button>
                  </div>
                </form>
              </div>
            </div>

            {/* Add Data Popup */}
            <div className="popup-modal-profile popup-student" style={{ visibility: isStudentListTableAdd ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body add-student-data" onClick={(e) => e.stopPropagation()} style={{ animation: isStudentListTableAdd ? 'dropBottom .3s linear' : '' }}>

                <div className="modal-close" onClick={() => setIsStudentListTableAdd(false)}>
                  <AiOutlineCloseCircle size={30} />
                </div>
                {/* Student Personal Details */}
                <div className="popup-header">
                  <div className="popup-edit">
                    <span>Student's Personal Details</span>
                  </div>
                  <hr />
                  <form onSubmit={addNewStudent}>
                    <div className="form-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '5%' }}>
                      <div className="add-student-left m">
                        <div className="form-control manage-account">
                          <span>LRN No.</span>
                          <input type="text" value={studentInfo.LRN} onChange={(e) => setStudentInfo((prev) => ({ ...prev, LRN: e.target.value }))} placeholder="LRN No." className="form-input manage-account" />
                        </div>
                        <div className="form-control manage-account">
                          <span>First Name</span>
                          <input type="text" value={studentInfo.firstName} onChange={(e) => setStudentInfo((prev) => ({ ...prev, firstName: e.target.value }))} placeholder="First Name" className="form-input manage-account" />
                        </div>
                        <div className="form-control manage-account">
                          <span>Middle Name</span>
                          <input type="text" placeholder="Middle Name" value={studentInfo.middleName} onChange={(e) => setStudentInfo((prev) => ({ ...prev, middleName: e.target.value }))} className="form-input manage-account" />
                        </div>
                        <div className="form-control manage-account">
                          <span>Last Name</span>
                          <input type="text" placeholder="Last Name" value={studentInfo.lastName} onChange={(e) => setStudentInfo((prev) => ({ ...prev, lastName: e.target.value }))} className="form-input manage-account" />
                        </div>
                        <div className="form-control manage-account">
                          <span>Gender</span>
                          <select className="form-input manage-account" value={studentInfo.gender} onChange={(e) => setStudentInfo((prev) => ({ ...prev, gender: e.target.value }))}>
                            <option value="" selected disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Gay">Gay</option>
                            <option value="Lesbian">Lesbian</option>
                          </select>
                        </div>
                        <div className="form-control manage-account">
                          <span>Civil Status</span>
                          <select className="form-input manage-account" value={studentInfo.civilStatus} onChange={(e) => setStudentInfo((prev) => ({ ...prev, civilStatus: e.target.value }))}>
                            <option value="" selected disabled>Select Civil Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Complacated">Complacated</option>
                          </select>
                        </div>
                      </div>
                      <div className="add-student-right m">
                        <div className="form-control manage-account">
                          <span>Contact Number</span>
                          <input type="text" placeholder='Contact Number' value={studentInfo.phoneNumber} onChange={(e) => setStudentInfo((prev) => ({ ...prev, phoneNumber: e.target.value }))} className="form-input manage-account" />
                        </div>
                        <div className="form-control manage-account">
                          <span>Religion</span>
                          <input type="text" placeholder='Religion' value={studentInfo.religion} onChange={(e) => setStudentInfo((prev) => ({ ...prev, religion: e.target.value }))} className="form-input manage-account" />
                        </div>
                        <div className="form-control manage-account">
                          <span>Birth Place</span>
                          <input type="text" placeholder='Birth Place' value={studentInfo.birthPlace} onChange={(e) => setStudentInfo((prev) => ({ ...prev, birthPlace: e.target.value }))} className="form-input manage-account" />
                        </div>
                        <div className="form-control manage-account">
                          <span>Address</span>
                          <input type="text" placeholder="Address" value={studentInfo.address} onChange={(e) => setStudentInfo((prev) => ({ ...prev, address: e.target.value }))} className="form-input manage-account" />
                        </div>
                        <div className="form-control manage-account">
                          <span>Date of Birth</span>
                          <input type="date" className="form-input manage-account" value={studentInfo.dateOfBirth} onChange={(e) => setStudentInfo((prev) => ({ ...prev, dateOfBirth: e.target.value }))} />
                        </div>
                        <div className="form-control manage-account">
                          <span>Parent/Guardian</span>
                          <input type="text" placeholder="Parent/Guardian" className="form-input manage-account" value={studentInfo.parentOrGuardian} onChange={(e) => setStudentInfo((prev) => ({ ...prev, parentOrGuardian: e.target.value }))} />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                        <button className="cancel-button" onClick={() => setIsStudentListTableAdd(false)} type='button'>
                          Cancel
                        </button>
                        <button className="update-button" type='submit'>Add</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Display or Edit Student Info */}
            <div className="popup-modal-profile popup-student" onClick={() => isCancelEditing ? setIsStudentListTableEdit(false) : isStudentListProfileEdt ? setIsCancelEditing(true) : setIsStudentListTableEdit(false)} style={{ visibility: isStudentListTableEdit ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body add-student-data" onClick={(e) => e.stopPropagation()} style={{ animation: isStudentListTableEdit ? 'dropBottom .3s linear' : '' }}>
                <div className="modal-close" onClick={() => isCancelEditing ? setIsStudentListTableEdit(false) : isStudentListProfileEdt ? setIsCancelEditing(true) : setIsStudentListTableEdit(false)}>
                  <AiOutlineCloseCircle size={30} />
                </div>

                {/* Student Personal Details */}
                <div className="popup-header">
                  <div className="popup-edit">
                    <span>Student's Personal Details</span>
                  </div>
                  <hr />
                  <form onSubmit={updateStudentInformation} >
                    <div className="form-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '5%' }}>
                      <div className="add-student-left m">
                        <div className="form-control manage-account">
                          <span>LRN No.</span>
                          <input type="text" className='form-input manage-account' value={updateStudentInfo.LRN} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, LRN: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''} />
                        </div>
                        <div className="form-control manage-account">
                          <span>First Name</span>
                          <input type="text" className='form-input manage-account' value={updateStudentInfo.firstName} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, firstName: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''} />
                        </div>
                        <div className="form-control manage-account">
                          <span>Middle Name</span>
                          <input type="text" className='form-input manage-account' value={updateStudentInfo.middleName} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, middleName: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''} />
                        </div>
                        <div className="form-control manage-account">
                          <span>Last Name</span>
                          <input type="text" className='form-input manage-account' value={updateStudentInfo.lastName} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, lastName: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''} />
                        </div>
                        <div className="form-control manage-account">
                          <span>Gender</span>
                          <select className='form-input manage-account' value={updateStudentInfo.gender} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, gender: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''}>
                            <option value="" selected disabled>Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Gay">Gay</option>
                            <option value="Lesbian">Lesbian</option>
                          </select>
                        </div>
                        <div className="form-control manage-account">
                          <span>Civil Status</span>
                          <select className='form-input manage-account' value={updateStudentInfo.civilStatus} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, civilStatus: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''}>
                            <option value="" selected disabled>Select Civil Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Complacated">Complacated</option>
                          </select>
                        </div>
                        <div className="form-control manage-account">
                          <span>Contact Number</span>
                          <input type="text" className='form-input manage-account' value={updateStudentInfo.phoneNumber} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, phoneNumber: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''} />
                        </div>
                        <div className="form-control manage-account">
                          <span>Religion</span>
                          <input type="text" className='form-input manage-account' value={updateStudentInfo.religion} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, religion: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''} />
                        </div>
                      </div>
                      <div className="add-student-right m">
                        <div className="form-control manage-account">
                          <span>Birth Place</span>
                          <input type="text" className='form-input manage-account' value={updateStudentInfo.birthPlace} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, birthPlace: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''} />
                        </div>
                        <div className="form-control manage-account">
                          <span>Address</span>
                          <input type="text" className='form-input manage-account' value={updateStudentInfo.address} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, address: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''} />
                        </div>
                        <div className="form-control manage-account">
                          <span>Date of Birth</span>
                          <input type="date" className='form-input manage-account' value={updateStudentInfo.dateOfBirth} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, dateOfBirth: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''} />
                        </div>
                        <div className="form-control manage-account">
                          <span>Parent/Guardian</span>
                          <input type="text" className='form-input manage-account' value={updateStudentInfo.parentOrGuardian} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, parentOrGuardian: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''} />
                        </div>
                        <div className="form-control manage-account">
                          <span>Currilulumn</span>
                          <select className='form-input manage-account' value={updateStudentInfo.curriculumn} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, curriculumn: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''}>
                            <option value="" selected disabled>Select Currilulumn</option>
                            <option value="Regular">Regular</option>
                            <option value="N/A">N/A</option>
                          </select>
                        </div>
                        <div className="form-control manage-account">
                          <span>Grade</span>
                          <select className="form-input manage-account" value={updateStudentInfo.grade} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, grade: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''}>
                            <option value="" selected disabled>Select Grade</option>
                            {displayGrade && displayGrade.map(item => (
                              <option key={item.id} value={item.grade}>{item.grade}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-control manage-account">
                          <span>Subject</span>
                          <select className="form-input manage-account" value={updateStudentInfo.subject} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, subject: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''}>
                            <option value="" selected disabled>Select Subject</option>
                            {displaySubject && displaySubject.map(item => (
                              <option key={item.id} value={item.subject}>{item.subject}</option>
                            ))}
                          </select>
                        </div>
                        <div className="form-control manage-account">
                          <span>School Year</span>
                          <select className="form-input manage-account" value={updateStudentInfo.SY} onChange={(e) => setUpdateStudentInfo((prev) => ({ ...prev, SY: e.target.value }))} disabled={!isStudentListProfileEdt ? 'disabled' : ''}>
                            <option value="" selected disabled>Select S.Y.</option>
                            {listSchoolYear && listSchoolYear.map(item => (
                              <option key={item.id} value={item.school_year}>{item.school_year}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    {isStudentListProfileEdt ? (
                      <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                        <button className="cancel-button" onClick={() => setIsCancelEditing(true)} type='button'>
                          Cancel
                        </button>
                        <button className="update-button" type='submit'>Save</button>
                      </div>
                    ) : (
                      <div className="form-control" style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }} onClick={() => setIsStudentProfileEdt(true)}>
                        <button style={{ width: '100%' }} className="update-button" type='button'>Edit</button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>

            {/* Cancel Edit Account Popup */}
            <div className="popup-modal-profile popup-student cancel-edit" style={{ visibility: isCancelEditing ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: isCancelEditing ? 'dropBottom .3s linear' : '' }}>

                <div className="popup-edit">
                  <span>Cancel?</span>
                </div>
                <hr />
                <div className="form-control manage-account">
                  <span>Are you sure you wan't to cancel? Data won't save!</span>
                </div>
                <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                  <button className='update-button' onClick={() => setIsCancelEditing(false)}>Cancel</button>
                  <button className='cancel-button' onClick={() => { setIsCancelEditing(false); setIsStudentProfileEdt(false) }}>Yes</button>
                </div>
              </div>
            </div>
          </div>

          {/* ################################################    GRADE LILST SIDE  ##################################################### */}
          <div className="header-label" style={{ display: isGradeList ? 'block' : 'none' }}>
            <div className="user-header" style={{ display: 'flex' }}>
              <span>Grade Section List</span>
              <div className="add-button" onClick={() => setIsGradeListTableAdd(true)}>
                <button>Add New Grade</button>
              </div>
            </div>
            <hr />
            <div style={{ display: 'flex', marginTop: '20px', alignItems: 'center', marginRight: '30px' }}>
              <input placeholder='Search on table...' value={searchGradeList} onChange={(e) => setSearchGradeList} type="text" className='additional-user' /><span style={{ padding: '0px', border: '1px solid lightblue', fontSize: '20px', width: '30px' }}><IoMdSearch style={{ marginLeft: '5px', marginTop: '5px', cursor: 'pointer' }} /></span>
              <div className='delete-edit' >
                <div className="delete-button" onClick={deleteGradeListButton} >
                  <RiDeleteBin6Line className='delete-icon' /><button> DELETE</button>
                </div>
                <div className="edit-button" onClick={editGradeListButton}>
                  <TbEdit className='edit-icon' /><button >EDIT</button>
                </div>
              </div>
            </div>

            <div className="table">
              <table>
                <thead>
                  <th>Grade</th>
                </thead>
                <tbody>
                  {gradeListToSearch.length === 0 ? (
                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '20px' }}>
                      <span>No grade found!</span>
                    </div>
                  ) : (
                    gradeListToSearch.map(item => (
                      // <tr className='tr' key={item.id} style={{ backgroundColor: deleteAndEdit ? 'rgb(135, 168, 178)' : '' }}>
                      <tr className={selectedRow === item.id ? 'tr selected' : 'tr'} onClick={(e) => { gradeListRowClicked(item); e.stopPropagation() }} key={item.id} style={{ backgroundColor: deleteAndEdit ? 'rgb(135, 168, 178)' : '' }} >
                        <td>{item.grade}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Manage Account Popup */}
            <div className="popup-modal-profile popup-student" style={{ visibility: isGradeListTableEdit ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: isGradeListTableEdit ? 'dropBottom .3s linear' : '' }}>

                <div className="popup-edit">
                  <span>Edit Grade</span>
                </div>
                <hr />
                <form onSubmit={handleEditGradeList}>
                  <div className="form-control manage-account">
                    <span>Grade </span>
                    <select className='form-input manage-account' style={{ height: '35px' }} value={updateGradeList} onChange={(e) => setUpdateGradeList(e.target.value)}>
                      <option value="" selected disabled>Select Grade</option>
                      {listGrade && listGrade.map(item => (
                        <option key={item.id} value={item.grade}>{item.grade}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                    <button className='cancel-button' onClick={() => setIsGradeListTableEdit(false)} type='button'>Cancel</button>
                    <button className='update-button' type='submit'>Update</button>
                  </div>
                </form>
              </div>
            </div>

            {/* Delete Account Popup */}
            <div className="popup-modal-profile popup-student" style={{ visibility: isGradeListTableDelete ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: isGradeListTableDelete ? 'dropBottom .3s linear' : '' }}>

                <form onSubmit={handleDeleteGradeList}>
                  <div className="popup-edit">
                    <span>Delete?</span>
                  </div>
                  <hr />
                  <div className="form-control manage-account">
                    <span>Are you sure you wan't to delete grade {fullnameToDelete}?</span>
                  </div>
                  <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                    <button className='update-button' onClick={() => setIsGradeListTableDelete(false)} type='button'>Cancel</button>
                    <button className='cancel-button' type='submit'>Delete</button>
                  </div>
                </form>
              </div>
            </div>

            {/* Add Account Popup */}
            <div className="popup-modal-profile popup-student" style={{ visibility: isGradeListTableAdd ? 'visible' : 'hidden' }}>
              <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: isGradeListTableAdd ? 'dropBottom .3s linear' : '' }}>

                <div className="popup-edit">
                  <span>Add Grade Section</span>
                </div>
                <hr />
                <form onSubmit={handleAddGradeList}>
                  <div className="form-control manage-account">
                    <span>Grade </span>
                    <select className='form-input manage-account' style={{ height: '35px' }} value={addGradeList} onChange={(e) => setAddGradeList(e.target.value)}>
                      <option value="" selected disabled>Select Grade</option>
                      {listGrade && listGrade.map(item => (
                        <option key={item.id} value={item.grade}>{item.grade}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                    <button className='cancel-button' onClick={() => setIsGradeListTableAdd(false)} type='button'>Cancel</button>
                    <button className='update-button' type='submit'>Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* user popup modal */}
      <div className="popup-modal-profile" onClick={() => setIsUserProfileClicked(false)} style={{ visibility: isUserProfileClicked ? 'visible' : 'hidden' }}>
        <div className="popup-body" onClick={(e) => e.stopPropagation()} style={{ animation: isUserProfileClicked ? 'dropBottom .3s linear' : '' }}>
          <div className="modal-close" onClick={() => setIsUserProfileClicked(false)}>
            <AiOutlineCloseCircle size={30} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src={userCredentials && userCredentials[0].image ? `${backendUrl}/assets/image uploads/${userCredentials[0].image}` : user} alt="" style={{ borderRadius: '50%', height: '130px', width: '130px', border: '3px solid #ccc' }} />
            {/* <img src={userCredentials && userCredentials[0].image[0] === "h" ? userCredentials[0].image : userCredentials && userCredentials[0].image[0] && userCredentials[0].image[0].match(/^\d/) ? `${backendUrl}/assets/image uploads/${userCredentials[0].image}` : givenProfile} alt="" style={{ borderRadius: '50%', height: '130px', width: '130px', border: '3px solid #ccc' }} /> */}
            <label htmlFor="uploadPhoto" style={{ marginTop: '100px', marginLeft: '-40px', cursor: 'pointer', zIndex: '3', color: 'white' }}>
              <VscDeviceCamera size={30} style={{ backgroundColor: 'rgb(71, 71, 98)', padding: '3px', borderRadius: '50%' }} />
              <input type="file" id="uploadPhoto" onChange={(e) => setProfileUpload(e.target.files[0])} style={{ display: 'none' }} />
            </label>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div>
              <h2>{userCredentials && `${userCredentials[0].first_name} ${userCredentials[0].middle_name} ${userCredentials[0].last_name}`}</h2>
            </div>
            <div style={{ marginTop: '10px' }}>
              <span>{userCredentials && userCredentials[0].user_type}</span>
            </div><br />
          </div>
          <hr />
          <div className="form-control" style={{ textAlign: 'center' }}>
            <span>Other profile view</span>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="popup-modal-profile popup-student" style={{ visibility: logout ? 'visible' : 'hidden' }}>
        <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: logout ? 'dropBottom .3s linear' : '' }}>

          <div className="popup-edit">
            <span>Logout?</span>
          </div>
          <hr />
          <div className="form-control manage-account">
            <span>Are you sure you wan't to Logout ?</span>
          </div>
          <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
            <button className='update-button' onClick={() => setLogout(false)}>No</button>
            <button className='cancel-button' onClick={() => { localStorage.removeItem('token'); navigate('/') }}>Yes</button>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="popup-modal-profile popup-student" style={{ visibility: changePassword ? 'visible' : 'hidden' }}>
        <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ animation: changePassword ? 'dropBottom .3s linear' : '' }}>

          <div className="popup-edit">
            <span>Change Password</span>
          </div>
          <hr />
          <form onSubmit={handleChangePassword}>
            <div className="form-control manage-account">
              <span>Username</span>
              <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} className='form-input manage-account' style={{ height: '35px' }} />
            </div>
            <div className="form-control manage-account">
              <span>Current Password</span>
              <input type="text" placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)} className='form-input manage-account' style={{ height: '35px' }} />
            </div>
            <div className="form-control manage-account">
              <span>New Password</span>
              <input type="text" placeholder='*********' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='form-input manage-account' style={{ height: '35px' }} />
            </div>
            <div className="form-control manage-account">
              <span>Confirm Password</span>
              <input type="text" placeholder='*********' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='form-input manage-account' style={{ height: '35px' }} />
            </div>
            <div className="form-control" style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
              <button className='update-button' type='button' onClick={() => setChangePassword(false)}>Cancel</button>
              <button className='cancel-button' type='submit'>Save</button>
            </div>
          </form>
        </div>
      </div>

      {/* fetching data screen */}
      <div className="popup-modal-profile" style={{ display: isLoading ? 'block' : 'none' }}>
        <div className="modal-pop-up-loading">
          <div className="modal-pop-up-loading-spiner"></div>
          <p>Loading...</p>
        </div>
      </div>

      {/* Loading div */}
      <div className='error-respond' style={{ display: isError || isSuccess ? 'block' : 'none', backgroundColor: isSuccess && !isError ? '#7b4ae4' : '#fb7d60' }}>
        <div>
          <h5>{errorMessage}</h5>
        </div>
      </div>

    </div>
  )
}

export default StaffAccount
