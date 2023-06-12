import {
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
  Select,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import jsPDF from "jspdf";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard = () => {
  const auth = JSON.parse(localStorage.getItem("loginDetails"));
  const [studentData, setStudentData] = useState([]);
  console.log("studentData", studentData);
  const [selectedStudent, setSelectedStudent] = useState(null);
  // const [adminDetails, setAdminDetails] = useState([]);
  // console.log("adminDetails", adminDetails);
  const [evaluatorRole, setEvaluatorRole] = useState(null);
  const [isAssign, setIsAssign] = useState(true);
  console.log("isAssign", isAssign);

  const [studentDetails, setStudentDetails] = useState();
  console.log("studentDetails", studentDetails);
  const [adminId, setAdminId] = useState();
  console.log("studentDetails", studentDetails);

  const [emailData, setEmailData] = useState([]);
  console.log("emailData", emailData);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleView = (student, i) => {
    setSelectedStudent(i);
    onOpen();
  };

  // const handleAssignee = (e, i, student) => {
  //   const arr = [];

  //   studentData?.map((val) => {
  //     if (student._id === val._id) {
  //       arr.push({ ...val, assignee: e.target.value });
  //     } else {
  //       arr.push(val);
  //     }
  //   });

  //   setStudentData(arr);

  //   setIsAssign(false);
  // };

  const handleAssigneeSubmit = async (student, i) => {
    console.log("student", student);
    setIsAssign(true);
    console.log("submit");
    // await axios
    //   .put(`/student/${student._id}`, student)
    //   .then(
    //     toast({
    //       status: "success",
    //       position: "top-right",
    //       title: "Assignee Created",
    //     })
    //   )
    //   .catch((err) => console.log("err.message", err.message));
  };

  const handleDownload = (student) => {
    // setIsGenerating(true);
    console.log("student pdf", student);
    const doc = new jsPDF();
    console.log("doc", doc);

    doc.text(`Name: ${student.name}`, 10, 10);
    doc.text(`Desc: ${student.desc}`, 10, 20);
    doc.text(`Country: ${student.country}`, 10, 30);
    doc.text(`Gender: ${student.gender}`, 10, 40);
    console.log("doc", doc);
    doc.save("a4.pdf");
    // setIsGenerating(false);
  };

  const fetchStudent = async () => {
    console.log("fetch``````````````````");

    try {
      console.log("try----");
      const data = await axios
        .get("/student", {
          headers: {
            Authorization: auth.token,
          },
        })
        .then((res) => setStudentData(res.data))
        .catch((err) => {
          console.log("err", err);
        });
      console.log("data", data);
      // .then((res) => console.log(res))
      // .catch((err) => console.log("err.message", err.message));
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  const fetchEmails = async () => {
    console.log("fetchEmails");
    try {
      const getAdmins = await fetch("/admin");
      // setAdminDetails(getAdmins.data);
      // console.log("getAdmins", getAdmins);
      const data = await getAdmins.json();
      console.log("data", data);
      setEmailData(data);
      const filteredEmails = data
        .filter((item) => item.role === "evaluator")
        .map((item) => item.email);
      setEvaluatorRole(filteredEmails);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const assignTasks = async (student, key) => {
    try {
      const body = {
        studentId: student._id,
        adminId: adminId,
      };

      setIsSubmiting(true);
      await axios
        .post("/student/assign-tasks", body)
        .then(
          // (res) => setStudentDetails(res.data),
          (res) => {
            toast({
              status: "success",
              position: "top-right",
              title: res?.data.message,
            });
          }
        )
        .catch((err) => {
          toast({
            status: "error",
            position: "top-right",
            title: err.response.data.message
              ? err.response.data.message
              : "error",
          });
        })
        .finally(() => setIsSubmiting(false));
    } catch (error) {
      console.log("error.message");
    }

    // setStudentDetails(getStudents.data);
  };

  useEffect(() => {
    fetchStudent();
    fetchEmails();
  }, []);
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
                <Th>Assignee</Th>
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
                          <Select
                            width="50%"
                            onChange={(e) => setAdminId(e.target.value)}
                          >
                            <option>Select Assigny</option>

                            {emailData &&
                              emailData
                                .filter((item) => item.role === "evaluator")
                                .map((option, key) => (
                                  <option key={key} value={option._id}>
                                    {option.email}
                                  </option>
                                ))}
                          </Select>
                          <Button
                            onClick={() => assignTasks(student, i)}
                            isLoading={isSubmiting}
                          >
                            Submit
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
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
        {/* <CreateAdmin /> */}
      </Container>
    </Box>
  );
};

export default Dashboard;
