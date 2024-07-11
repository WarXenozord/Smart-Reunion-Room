import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Perguntas e Respostas Frequentes" />

      <Accordion defaultCollapsed>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Como eu posso conseguir mais dispositivos?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            A aquisição de mais dispositivos extras está condicionada ao número máximo de dispositivos suportados em cada plano. Caso
            o seu número de dispositivos ainda seja inferior ao número máximo previsto em contrato, é possível entrar em contato diretamente
            com o seu administrador para realizar uma nova aquisição. Caso contrário, será necessário contratar um novo plano para acomodar mais dispositivos.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultCollapsed>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Estou com um problema em um dos meus dispositivos e preciso de assistência. 
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Entre em contato com o nosso suporte através da aba suporte ou pelo telefone 0800 9999999.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultCollapsed>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Perdi meus dados de acesso, como posso recuperá-los?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Entre em contato com o seu administrador e solicite um recadastramento de dados. Pode ser necessário refazer o processo
          de validação de identificação.
           
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultCollapsed>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          É necessária uma rede wifi para o funcionamento do sistema?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Sim, conforme previsto no contrato de serviço, é necessária uma rede local wifi IEEE 802.11 na banda de 2.4GHz para
          o devido funcionamento do sistema.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultCollapsed>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Como posso cadastrar novos funcionários no sistema?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          A partir da aba cadastro de usuário, você encontrará um formulário para cadastro de novos usuários no sistema. Ao ser preenchido
          com os dados necessários, esse formulário enviará ao novo usuário um email para que ele possa completar seu cadastro.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
