import { useState, useEffect, useContext } from "react";
import { ResultDataType, ResultBaseDataType, resultDefaultDataGet } from '../../common/AppTypes';
import { DISPLAY_TYPES, LANG_TYPES } from "../../common/AppConst";
import { db } from "../../common/db";
import { GlobalStateContext } from "../../providers/GlobalStateProvider";
import { DisplayTypeContext } from "../../providers/DisplayTypeProvider";
import { format } from "date-fns";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export const SaveData: React.VFC = () => {

  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  const [resultDataArray, setResultDataArray] = useState<ResultDataType[]>([resultDefaultDataGet()]);

  //DB読み込み
  useEffect(() => {
    db.resultData.toArray()
      .then((rd) => {
        if (rd !== undefined) {
          setResultDataArray(rd);
        }
      });
  }, []);

  return (
    <div style={{ marginTop: '3rem', width: '22rem' }}>

      <Typography variant="h6" component="h2" style={{ display: 'inline-flex', alignItems: 'center', margin: '0 0 0 -0.5em' }}>
        <SaveIcon color={"primary"} />{globalState.lang === LANG_TYPES.JP ? "セーブデータ" : "Save Data"}
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1rem' }}>
        {resultDataArray.map((value, index) => {
          return <DataCard id={value.id} baseData={value.baseData} key={"dataCard" + index} />
        })}
      </div>
    </div>
  );
}

type Props = {
  id: number,
  baseData: ResultBaseDataType,
}

const DataCard: React.VFC<Props> = ({ id, baseData }) => {

  const { globalState, setGlobalState } = useContext(GlobalStateContext);
  const [ displayType, setDisplayType ] = useContext(DisplayTypeContext);

  const cardClick = () => {
    const newState = {...globalState};
    newState.displayResultId = id;
    setGlobalState(newState);
    db.globalState.update(0,{displayResultId:id});
    setDisplayType(DISPLAY_TYPES.RESULT_CONTENTS);
  }

  return (
    <Card sx={{ width: '18rem', marginBottom: '1rem', backgroundColor: 'hsl(209, 78%, 98%)' }}>
      {/* <Card sx={{ width: '18rem', marginBottom: '1rem', backgroundColor: 'hsla(209, 100%, 97%, 1)' }}></Card> */}
      <CardActionArea onClick={cardClick}>
        <CardContent>
          <Typography variant="body1" component="h3">
            {baseData.macthName}
          </Typography>
          <div style={{ display: 'flex' }}>
            <Typography variant="body1" component="div" sx={cardTypographyStyles}>
              {baseData.player1Name}
            </Typography>
            <Typography variant="body1" component="div" sx={cardTypographyStyles}>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                {baseData.gameCount.map((value,index)=>{
                    return <li key={"gameCount"+index}>{value[0]} - {value[1]}</li>
                })}
              </ul>
            </Typography>
            <Typography variant="body1" component="div" sx={cardTypographyStyles}>
            {baseData.player2Name}
            </Typography>
          </div>
          <Typography variant="caption" component="p" style={{ textAlign: 'right' }}>
            {format(baseData.macthDate,'yyyy-MM-dd')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const cardTypographyStyles = {
  width: '33%',
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};