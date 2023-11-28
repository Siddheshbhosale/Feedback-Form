
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Option from '@mui/joy/Option';
import Box from '@mui/material/Box';

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
        color: theme.palette.action.disabled,
    },
}));

const customIcons = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon color="error" />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon color="error" />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon color="warning" />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon color="success" />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon color="success" />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

// IconContainer.propTypes = {
//     value: PropTypes.number.isRequired,
// };

function QuestionAnswer({ handleChangeforData }) {
    const [values, setValues] = useState({
        stateOfClass: 3,
        courseContents: 3,
        audioConnectivity: 3,
        lectureStructure: 3,
        learningMaterials: 3,
    });
    const handleChange = (name, value) => {
        setValues({ ...values, [name]: value });
    };

    const [hover, setHover] = useState({
        stateOfClass: -1,
        courseContents: -1,
        audioConnectivity: -1,
        lectureStructure: -1,
        learningMaterials: -1,
    })

    const handleHoverChange = (name, value) => {
        setHover({ ...hover, [name]: value });
    };

    const aspects = [
        {
            name: 'stateOfClass',
            label: 'How is the general state of the class',
        },
        {
            name: 'courseContents',
            label: 'How is the course contents',
        },
        {
            name: 'audioConnectivity',
            label: 'Please evaluate the audio and virtual connectivity',
        },
        {
            name: 'lectureStructure',
            label: 'The lectures in the class were well structured and coordinated',
        },
        {
            name: 'learningMaterials',
            label: 'The learning materials were readily available',
        },
    ];

    return (
        // <Grid container spacing={2}>
        <>
            {aspects.map((aspect) => (
                <Grid item xs={12} md={12} key={aspect.name}>
                    <Box
                        sx={{
                            borderRadius: '10px',
                            padding: '16px',
                            border: '1px solid black',
                            borderColor: 'rgb(133, 133, 133)',
                        }}
                    >
                        <Typography variant="h6">*{aspect.label}</Typography>
                        <StyledRating
                            name={aspect.name}
                            defaultValue={3}
                            IconContainerComponent={IconContainer}
                            onChange={(event, newValue) => {
                                handleChangeforData(customIcons[newValue].label, aspect.name);
                                handleChange(aspect.name, newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                handleHoverChange(aspect.name, newHover)
                            }}
                            highlightSelectedOnly
                        />
                        {values[aspect.name] !== null && (
                            <Box>{customIcons[hover[aspect.name] !== -1 ? hover[aspect.name] : values[aspect.name]].label}</Box>
                        )}
                    </Box>
                </Grid>
            ))}
        </>
        // </Grid>
    );
}

export default QuestionAnswer;