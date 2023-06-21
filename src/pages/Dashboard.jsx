import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import jsPDF from "jspdf";
import React from "react";
import Select from "react-select";
import { useState } from "react";
import { useEffect } from "react";

const AssigneeActions = (props) => {
  const auth = JSON.parse(localStorage.getItem("loginDetails"));
  const { studentData, index, students, setStudentData } = props;
  console.log("studentData", studentData);

  const [adminData, setAdminData] = React.useState([]);

  const [evaluatorData, setEvaluatorData] = React.useState([]);

  const toast = useToast();

  const [isSubmitting, isState] = useBoolean(false);

  const [isApproved, setIsApproved] = useState(false);

  const [isApprove, setIsApprove] = useState(false);
  const [isDenied, setIsDenied] = useState(true);

  const [isDeniedVisible, setIsDeniedVisible] = useState(false);

  const [status, setStatus] = useState();
  console.log("status", status);

  const fetchEmails = async () => {
    try {
      const getAdmins = await axios.get("/admin");
      const data = getAdmins.data;
      setAdminData(data);
      const filteredEmails = data
        .filter((item) => item.role === "evaluator")
        .map((item) => {
          return { label: item.email, value: item._id };
        });
      setEvaluatorData(filteredEmails);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  function handleOnchange() {
    const [selectedOption, studentData] = [...arguments];

    const selectedAdmin = adminData.find(
      (ad) => ad._id === selectedOption.value
    );

    const findIndex = students.findIndex((obj) => obj._id === studentData._id);

    if (findIndex !== -1) {
      students.splice(findIndex, 1);

      const std = students.splice(findIndex, 0, {
        ...studentData,
        assignedTo: selectedAdmin,
      });

      const newStudentData = [...students, ...std];

      setStudentData(newStudentData);
    }
  }

  async function handleSubmit(data) {
    const body = { studentId: data._id, adminId: data.assignedTo._id };

    try {
      isState.on();
      // setIsSubmiting(true);
      const res = await axios.post("/student/assign-tasks", body);

      toast({
        status: "success",
        position: "top-right",
        title: res?.data.message,
      });
    } catch (err) {
      toast({
        status: "error",
        position: "top-right",
        title: err.response.data.message ? err.response.data.message : "error",
      });
    } finally {
      isState.off();
    }
  }

  async function handleApprove(studentData, status) {
    // setIsApproved(!isApproved);
    // setIsDeniedVisible(!isDeniedVisible);
    // setIsApprove(true);
    // setIsDenied(false);
    await axios
      .put(`student/${studentData._id}`, { status: status })
      .then((res) => {
        setStatus(res.data.status);
      })
      .catch((err) => console.log("err.message", err.message));
  }

  React.useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <React.Fragment>
      {auth.role === "superAdmin" ? (
        <>
          <Select
            options={evaluatorData}
            onChange={(selectedOption) =>
              handleOnchange(selectedOption, studentData)
            }
            value={evaluatorData?.find(
              (eva) => eva?.value === studentData?.assignedTo?._id
            )}
          />
          <Button
            isLoading={isSubmitting}
            onClick={() => handleSubmit(studentData)}
          >
            Submit
          </Button>
        </>
      ) : (
        ""
      )}

      <Button
        variant="outline"
        onClick={() => handleApprove(studentData, true)}
        // isDisabled={isApproved}
        // isDisabled={isApprove}
      >
        Approve
      </Button>
      <Button
        variant="outline"
        ml="2"
        onClick={() => handleApprove(studentData, false)}
        // isDisabled={!isApproved}
        // isDisabled={isDenied}
        // visibility={isDeniedVisible ? "visible" : "hidden"}
      >
        Deny
      </Button>
      <Text>
        {studentData && studentData.status === true
          ? "Approved"
          : studentData.status === false
          ? "Denied"
          : "Not selected"}
      </Text>
    </React.Fragment>
  );
};

const Dashboard = () => {
  const auth = JSON.parse(localStorage.getItem("loginDetails"));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [evaluatorRole, setEvaluatorRole] = useState(null);

  const [adminId, setAdminId] = useState();

  const [studentData, setStudentData] = useState([]);
  const [emailData, setEmailData] = useState([]);

  const [isSubmiting, setIsSubmiting] = useState(false);

  const [isSubmitting, isState] = useBoolean(false);

  const handleView = (student, i) => {
    setSelectedStudent(i);
    onOpen();
  };

  const handleDownload = (student) => {
    // setIsGenerating(true);
    const doc = new jsPDF();
    doc.text(`Name: ${student.name}`, 10, 10);
    doc.text(`Desc: ${student.desc}`, 10, 20);
    doc.text(`Country: ${student.country}`, 10, 30);
    doc.text(`Gender: ${student.gender}`, 10, 40);
    doc.save("a4.pdf");
    // setIsGenerating(false);
  };

  const fetchStudent = async () => {
    try {
      const data = await axios.get("/student", {
        headers: {
          Authorization: auth.token,
        },
      });
      setStudentData(data.data);
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  const filteredOptions = emailData.filter((item) => item.role === "evaluator");

  const selectOptions = filteredOptions.map((option) => ({
    value: option._id,
    label: option.email,
  }));

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selected) => {
    setSelectedOption(selected);
  };

  const fetchEmails = async () => {
    try {
      const getAdmins = await axios.get("/admin");
      const data = getAdmins.data;
      setEmailData(data);
      const filteredEmails = data
        .filter((item) => item.role === "evaluator")
        .map((item) => item.email);
      setEvaluatorRole(filteredEmails);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  useEffect(() => {
    fetchStudent();
    fetchEmails();
  }, []);

  const renderModal = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Student Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Name :{" "}
              {studentData[selectedStudent] &&
                studentData[selectedStudent].name}
            </Text>
            <Text>
              Desc :{" "}
              {studentData[selectedStudent] &&
                studentData[selectedStudent].desc}
            </Text>
            <Text>
              Country :{" "}
              {studentData[selectedStudent] &&
                studentData[selectedStudent].country}
            </Text>
            <Text>
              Gender :{" "}
              {studentData[selectedStudent] &&
                studentData[selectedStudent].gender}
            </Text>
            <Text></Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDownload(studentData[selectedStudent])}
            >
              Download
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Box my="5">
      <Container maxW="container.xl">
        <Heading>Student Details</Heading>
        <TableContainer border="1px solid grey" my="5">
          <Table variant="striped">
            <TableCaption>Student Details</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Description</Th>
                <Th>View</Th>
                <Th>Download</Th>
                <Th>{auth.role === "superAdmin" ? "Assignee" : ""}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {studentData &&
                studentData?.map((student, i) => {
                  return (
                    <Tr key={i}>
                      <Td>{student.name}</Td>
                      <Td>{student.desc}</Td>
                      <Td
                        onClick={() => handleView(student._id, i)}
                        cursor="pointer"
                      >
                        View
                      </Td>
                      <Td
                        onClick={() => handleDownload(student)}
                        cursor="pointer"
                      >
                        Download
                      </Td>
                      <Td>
                        <Flex>
                          <AssigneeActions
                            studentData={student}
                            students={studentData}
                            setStudentData={setStudentData}
                            index={i}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
        {renderModal()}
        {/* <CreateAdmin /> */}
      </Container>
    </Box>
  );
};

export default Dashboard;
