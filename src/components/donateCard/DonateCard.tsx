import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import './DonateCard.css';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

interface DonateCardProps {
  loading: boolean;
  handleSubmit: (data: any) => void;
}

export default function DonateCard({ loading, handleSubmit }: DonateCardProps) {
  const [garmentCount, setGarmentCount] = useState('');
  const [garmentType, setGarmentType] = useState('');
  const [otherGarmentType, setOtherGarmentType] = useState('');
  const [garmentUsage, setGarmentUsage] = useState('');
  const [garmentWashPeriod, setGarmentWashPeriod] = useState('');
  const [garmentCondition, setGarmentCondition] = useState<string[]>([]);
  const [otherGarmentCondition, setOtherGarmentCondition] = useState('');
  const [garmentQuality, setGarmentQuality] = useState('');

  const handleGarmentTypeChange = (event: SelectChangeEvent) => {
    setGarmentType(event.target.value as string);
  };

  const handleGarmentUsageChange = (event: SelectChangeEvent) => {
    setGarmentUsage(event.target.value as string);
  };

  const handleGarmentWashPeriodChange = (event: SelectChangeEvent) => {
    setGarmentWashPeriod(event.target.value as string);
  };

  const handleGarmentQualityChange = (event: SelectChangeEvent) => {
    setGarmentQuality(event.target.value as string);
  };

  const handleGarmentConditionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!garmentCondition.includes(event.target.name as string)) {
      if (event.target.checked) {
        setGarmentCondition([...garmentCondition, event.target.name as string]);
      }
    } else if (!event.target.checked) {
      const currentConditions = [...garmentCondition];
      const currentIndex = currentConditions.indexOf(event.target.name);
      if (currentIndex >= 0) {
        currentConditions.splice(currentIndex, 1);
        setGarmentCondition(currentConditions);
      }
    }
  };

  const onClickSubmit = () => {
    handleSubmit({
      garmentCount: garmentCount !== '' ? parseInt(garmentCount, 10) : 0,
      garmentType,
      otherGarmentType,
      garmentUsage,
      garmentWashPeriod,
      garmentCondition,
      otherGarmentCondition,
      garmentQuality,
    });
  };
  return (
    <Card sx={{ minWidth: 500 }}>
      <CardHeader title="Donate" />
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: '1fr' },
          }}
        >
          <FormControl variant="standard" className="form-input">
            <InputLabel htmlFor="count">No of Garments</InputLabel>
            <Input
              inputProps={{
                min: 1,
              }}
              type="number"
              id="garmentCount"
              value={garmentCount}
              onChange={(e) => setGarmentCount(e.target.value)}
            />
          </FormControl>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                sm: garmentType === 'other' ? '1fr 1fr' : '1fr',
                gap: garmentType === 'other' ? 10 : 0,
              },
            }}
          >
            <FormControl variant="standard" className="form-input">
              <InputLabel id="garmentType">Type of Garment</InputLabel>
              <Select
                variant="standard"
                labelId="garmentType"
                id="garmentType"
                value={garmentType}
                label="Role"
                onChange={handleGarmentTypeChange}
                style={{ textAlign: 'left' }}
              >
                <MenuItem value="office-wear">Office Wear</MenuItem>
                <MenuItem value="casual-wear">Casual Wear</MenuItem>
                <MenuItem value="active-wear">Activewear</MenuItem>
                <MenuItem value="winter-clothes">Winter Clothes</MenuItem>
                <MenuItem value="intimates">Intimates</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            {garmentType === 'other' && (
              <FormControl variant="standard" className="form-input">
                <InputLabel htmlFor="otherGarmentType">
                  Enter Garment Type
                </InputLabel>
                <Input
                  id="otherGarmentType"
                  value={otherGarmentType}
                  onChange={(e) => setOtherGarmentType(e.target.value)}
                />
              </FormControl>
            )}
          </Box>
          <FormControl variant="standard" className="form-input">
            <InputLabel id="garmentUsage">
              How Long did You Use the Garment?
            </InputLabel>
            <Select
              variant="standard"
              labelId="garmentUsage"
              id="garmentType"
              value={garmentUsage}
              onChange={handleGarmentUsageChange}
              style={{ textAlign: 'left' }}
            >
              <MenuItem value="less-6-months">Less than 6 months</MenuItem>
              <MenuItem value="6-12-months">6-12 months</MenuItem>
              <MenuItem value="12-18-months">12-18 months</MenuItem>
              <MenuItem value="18-24-months">18-24 months</MenuItem>
              <MenuItem value="more-2-years">More than 2 years</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" className="form-input">
            <InputLabel id="garmentWashPeriod">
              How Often did You Wash the Garment?
            </InputLabel>
            <Select
              variant="standard"
              labelId="garmentWashPeriod"
              id="garmentWashPeriod"
              value={garmentWashPeriod}
              onChange={handleGarmentWashPeriodChange}
              style={{ textAlign: 'left' }}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="1-per-2-days">1 time per 2 days</MenuItem>
              <MenuItem value="1-per-3-days">1 time per 3 days</MenuItem>
              <MenuItem value="1-per-4-days">1 time per 4 days</MenuItem>
              <MenuItem value="1-per-5-days">1 time per 5 days</MenuItem>
              <MenuItem value="1-per-6-days">1 time per 6 days</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="more-weekly">More than weekly</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: 'flex' }}>
            <FormControl
              sx={{ m: 3 }}
              component="fieldset"
              variant="standard"
              style={{ margin: '10px 0' }}
            >
              <FormLabel component="legend">Garment Condition</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={garmentCondition.includes('stains')}
                      onChange={handleGarmentConditionChange}
                      name="stains"
                    />
                  }
                  label="Stains"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={garmentCondition.includes('color-shade')}
                      onChange={handleGarmentConditionChange}
                      name="color-shade"
                    />
                  }
                  label="Color Shade"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={garmentCondition.includes('defects')}
                      onChange={handleGarmentConditionChange}
                      name="defects"
                    />
                  }
                  label="Defects"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={garmentCondition.includes('no-defects')}
                      onChange={handleGarmentConditionChange}
                      name="no-defects"
                    />
                  }
                  label="No Defects"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={garmentCondition.includes('other')}
                      onChange={handleGarmentConditionChange}
                      name="other"
                    />
                  }
                  label="Other"
                />
              </FormGroup>
            </FormControl>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                sm: '1fr',
                gap: 0,
              },
            }}
          >
            {garmentCondition.includes('other') && (
              <FormControl variant="standard" className="form-input">
                <InputLabel htmlFor="otherGarmentCondition">
                  Enter Garment Condition
                </InputLabel>
                <Input
                  id="otherGarmentCondition"
                  value={otherGarmentCondition}
                  onChange={(e) => setOtherGarmentCondition(e.target.value)}
                />
              </FormControl>
            )}
          </Box>
          <FormControl variant="standard" className="form-input">
            <InputLabel id="garmentQuality">Garment Quality</InputLabel>
            <Select
              variant="standard"
              labelId="garmentQuality"
              id="garmentQuality"
              value={garmentQuality}
              onChange={handleGarmentQualityChange}
              style={{ textAlign: 'left' }}
            >
              <MenuItem value="1">1 (Low)</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5 (High)</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </CardContent>
      <CardActions>
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          width="100%"
        >
          <LoadingButton
            loading={loading}
            size="large"
            fullWidth
            variant="contained"
            onClick={onClickSubmit}
          >
            Submit
          </LoadingButton>
        </Stack>
      </CardActions>
    </Card>
  );
}
