import { ProjectInterface } from "@/types/project";
import { HStack, SimpleGrid, VStack, Text } from "@chakra-ui/react";
import { Fragment } from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects }: { projects: ProjectInterface[] }) => {
  return (
    <VStack alignItems="stretch" spacing={4}>
      <HStack justifyContent="space-between" spacing={4}>
        <Text
          fontFamily="Playfair Display"
          fontSize="32px"
          fontWeight={700}
          lineHeight="1.25"
        >
          Projects
        </Text>
      </HStack>

      <SimpleGrid columns={[1, null, null, null, 3]} spacing={4}>
        {projects.map((project) => {
          return (
            <Fragment key={project._id}>
              <ProjectCard project={project} />
            </Fragment>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};
export default ProjectList;
