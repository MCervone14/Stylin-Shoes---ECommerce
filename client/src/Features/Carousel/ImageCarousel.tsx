import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
  Image,
} from "pure-react-carousel";
import { Flex, HStack, Heading, Text } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const ImageCarousel = () => {
  return (
    <CarouselProvider
      currentSlide={0}
      visibleSlides={1}
      totalSlides={3}
      infinite
      naturalSlideHeight={0}
      naturalSlideWidth={0}
    >
      <Slider>
        <HStack position="relative">
          <Slide index={2} style={{ position: "relative" }}>
            <Heading
              fontSize="50px"
              fontWeight="extrabold"
              position="absolute"
              color="#ffffff"
              top="30%"
              left="5%"
              w="50%"
            >
              Nike Air Max{" "}
              <Text as="span" color="orange.500">
                Orange
              </Text>
            </Heading>
            <ButtonBack style={{ position: "absolute", left: 20, top: "50%" }}>
              <ArrowLeftIcon fontSize="5xl" />
            </ButtonBack>
            <Image
              src="/images/NikeAirMaxOrange.jpg"
              style={{ height: "800px", width: "100%", objectFit: "cover" }}
              hasMasterSpinner
            />
            <ButtonNext style={{ position: "absolute", right: 20, top: "50%" }}>
              <ArrowRightIcon fontSize="5xl" />
            </ButtonNext>
          </Slide>

          <Slide index={2} style={{ position: "relative" }}>
            <Heading
              fontSize="50px"
              fontWeight="extrabold"
              position="absolute"
              color="#ffffff"
              top="30%"
              left="5%"
              w="25%"
            >
              Nike Air Jordan 1{" "}
              <Text as="span" color="gray.500">
                FlyKnit Edition
              </Text>
            </Heading>
            <ButtonBack style={{ position: "absolute", left: 20, top: "50%" }}>
              <ArrowLeftIcon fontSize="5xl" />
            </ButtonBack>
            <Image
              src="/images/NikeAirJordan1Gray.jpg"
              style={{ height: "800px", width: "100%", objectFit: "cover" }}
              hasMasterSpinner
            />
            <ButtonNext style={{ position: "absolute", right: 20, top: "50%" }}>
              <ArrowRightIcon fontSize="5xl" />
            </ButtonNext>
          </Slide>

          <Slide index={2} style={{ position: "relative" }}>
            <Heading
              fontSize="50px"
              fontWeight="extrabold"
              position="absolute"
              color="#ffffff"
              top="20%"
              left="5%"
              w="20%"
            >
              <Text as="span" color="blackAlpha.900">
                Nike Free Run
              </Text>{" "}
              FlyKnit Edition
            </Heading>
            <ButtonBack style={{ position: "absolute", left: 20, top: "50%" }}>
              <ArrowLeftIcon fontSize="5xl" />
            </ButtonBack>
            <Image
              src="/images/NikeFree.jpg"
              style={{ height: "800px", width: "100%", objectFit: "cover" }}
              hasMasterSpinner
            />
            <ButtonNext style={{ position: "absolute", right: 20, top: "50%" }}>
              <ArrowRightIcon fontSize="5xl" />
            </ButtonNext>
          </Slide>
        </HStack>
      </Slider>
    </CarouselProvider>
  );
};

export default ImageCarousel;
