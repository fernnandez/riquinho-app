import { Box, Button, Group, ThemeIcon, Title, Divider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import { GiStairsGoal } from "react-icons/gi";
import { Navigation } from "../../components/Navigation";
import { Metas } from "../Home/components/Metas";
import { CreateMetaModal } from "../Home/components/Metas/MetaModals/CreateMetaModal";

export function MetasPage() {
    const [openedCreateMeta, handlersCreateMeta] = useDisclosure(false);

  return (
    <Navigation>
      <Box style={{ width: "100%", padding: "1rem" }}>
      <Group align="center" mt="2rem">
        <Divider mt="2rem" size="md" color="blue" />
        <Title order={2} style={{ cursor: 'default' }}>
          Metas
        </Title>
        <ThemeIcon size={30}>
          <GiStairsGoal size={30} />
        </ThemeIcon>
      </Group>
      
      <Button
        color="blue"
        mt="2rem"
        leftIcon={<AiOutlinePlus />}
        onClick={() => handlersCreateMeta.open()}
      >
        Adicionar nova meta
      </Button>
      <Metas />
      </Box>
      <CreateMetaModal
        isOpen={openedCreateMeta}
        onClose={handlersCreateMeta.close}
      />
    </Navigation>
    
  );
}
