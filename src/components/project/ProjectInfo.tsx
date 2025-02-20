import isNil from "lodash/isNil";
import WithLoader from "@/components/WithLoader";
import { ProjectInterface } from "@/types/project";
import {
  HStack,
  VStack,
  AvatarGroup,
  Avatar,
  Text,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { useApi } from "@/hook/useApi";
import { useRouter } from "next/router";
import api from "@/components/api";
import { PrimaryButton, SecondaryButton } from "@/components/Buttons";
import CustomModel from "@/components/CustomModal";
import ProjectModel from "@/components/project/ProjectModel";
import { useUserInfo } from "@/context/userInfo";
import { Fragment } from "react";

const ProjectInfo = ({ projectId }: { projectId: string }) => {
  const { userId } = useUserInfo();
  return (
    <WithLoader apiUrl={!isNil(projectId) ? `/project/${projectId}` : ""}>
      {({ data, mutate }: { data: ProjectInterface; mutate: () => void }) => {
        return (
          <>
            <Stack
              direction={["column", null, "row"]}
              justifyContent="space-between"
              spacing={4}
            >
              <VStack alignItems="stretch">
                <Text
                  fontFamily="Playfair Display"
                  fontSize={["26px", null, "34px"]}
                  fontWeight={700}
                >
                  {data.title}
                </Text>
                <Text
                  fontFamily="Noto Serif"
                  fontSize={["16px", null, "20px"]}
                  fontWeight={500}
                  color="gray"
                >
                  {data.description}
                </Text>
              </VStack>
              {data.owner._id === userId && (
                <ProjectActions projectData={data} projectMutate={mutate} />
              )}
            </Stack>
            <HStack alignItems="center" spacing={4}>
              <Text
                fontFamily="Noto Serif"
                fontSize={["16px", null, "20px"]}
                fontWeight={700}
              >
                Members:{" "}
              </Text>
              <AvatarGroup max={3} size={["sm", null, "md"]} gap={1}>
                {data.members.map((mem) => (
                  <Fragment key={mem._id}>
                    <Avatar size={["sm", null, "md"]} name={mem.name} />
                  </Fragment>
                ))}
              </AvatarGroup>
            </HStack>
          </>
        );
      }}
    </WithLoader>
  );
};

const ProjectActions = ({
  projectData,
  projectMutate,
}: {
  projectData: ProjectInterface;
  projectMutate: () => void;
}) => {
  const router = useRouter();
  const { makeApiCall } = useApi();
  const {
    isOpen: isDeleteProjectModalOpen,
    onOpen: onDeleteProjectModalOpen,
    onClose: onDeleteProjectModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditProjectModalOpen,
    onOpen: onEditProjectModalOpen,
    onClose: onEditProjectModalClose,
  } = useDisclosure();

  const handleDeleteProject = () => {
    makeApiCall({
      apiFn: () =>
        api(`/project/delete/${projectData._id}`, {
          method: "DELETE",
        }),
      successMsg: {
        title: "Project deleted successfully",
      },
      onSuccess: (res) => {
        router.replace("/");
        onDeleteProjectModalClose();
      },
    });
  };

  return (
    <HStack>
      <CustomModel
        title="Confirmation!!!!"
        isOpen={isDeleteProjectModalOpen}
        onClose={onDeleteProjectModalClose}
        footer={
          <HStack>
            <PrimaryButton
              size="md"
              bg="red.600"
              _hover={{
                bg: "red.300",
              }}
              onClick={handleDeleteProject}
            >
              Delete
            </PrimaryButton>
          </HStack>
        }
      >
        <Text pb="60px">Are you sure you want to delete this project?</Text>
      </CustomModel>
      <ProjectModel
        isOpen={isEditProjectModalOpen}
        onClose={onEditProjectModalClose}
        title="Edit Project"
        onSuccess={projectMutate}
        projectId={projectData._id}
        defaultValues={{
          title: projectData.title,
          description: projectData.description,
          memberIds: projectData.members
            .filter((mem) => projectData.owner._id !== mem._id)
            .map((mem) => ({
              label: `${mem.name} (${mem.email})`,
              value: mem._id,
            })),
        }}
      />
      <PrimaryButton onClick={onEditProjectModalOpen}>Edit</PrimaryButton>
      <SecondaryButton
        borderColor="red.400"
        color="red.400"
        _hover={{
          bg: "red.50",
          borderColor: "red.400",
        }}
        onClick={onDeleteProjectModalOpen}
      >
        Delete
      </SecondaryButton>
    </HStack>
  );
};

export default ProjectInfo;
